const Post = require("../models/postModel");
const Reaction = require("../models/reactionmodel");
const fs = require("fs");
const moment = require('moment'); 
const mongoose = require("mongoose"); //
const { populate } = require("../models/postModel");

exports.create = (req, res) => {
    req.body.title = req.body.title.replace(/&#x27;/g, "'");
    req.body.content = req.body.content.replace(/&#x27;/g, "'");

    const post = new Post({
        ...req.body,
        userId: req.auth.userId,
        datePosted: Date.now(),
        displayDatePosted: moment().format('Do MMMM YYYY, h:mm a'),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });

    post.save()
        .then(() => res.status(201).json({message: "Post created"}))
        .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({error}))
}

exports.getAll = (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}))
}

exports.modify = (req, res) => {
    req.body.title = req.body.title.replace(/&#x27;/g, "'");
    req.body.content = req.body.content.replace(/&#x27;/g, "'");

    if(req.auth.userId !== req.body.userId && !req.auth.admin){   
        return res.status(403).json({message: "You don't have permission to edit this post"})
    }else{
        const updatedPost = req.file ?
        {
            ...req.body,
            displayDateEdited: moment().format('Do MMMM YYYY, h:mm a'),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : {...req.body, displayDateEdited: moment().format('Do MMMM YYYY, h:mm a')};
            
        Post.updateOne({_id: req.params.id}, {...updatedPost, _id: req.params.id}) 
        .then(()=> res.status(200).json({message: "Post updated"}))
        .catch(error => res.status(400).json({error}))
    }
}

exports.delete = (req, res) =>{
    Post.findOne({_id: req.params.id})
        .then(post =>{
            if(req.auth.userId !== post.userId && !req.auth.admin){
                return res.status(403).json({message: "You don't have permission to delete this post"})
            }
            const filename = post.imageUrl.split("/images/")[1];                 
            fs.unlink(`images/${filename}`, ()=>{
                Post.deleteOne({_id: req.params.id})
                .then(()=> res.status(200).json({message: "Post deleted"}))
                .catch(error => res.status(400).json({error}))
            });
        })
        .catch(error => res.status(500).json({error}));
}

function createResponseObject(message, data){
            return {message: message, likes: data.likes, dislikes: data.dislikes, usersLiked: data.usersLiked, usersDisliked: data.usersDisliked};
        }

exports.likePost = (req, res) =>{
    const postId = req.params.id;
    const userId = req.auth.userId; 
    
    Post.findOne({_id: postId})
        .then(post => {
            if(post.usersLiked.includes(userId) === false){                                     
                if(post.usersDisliked.includes(userId) === false){
                    Post.findOneAndUpdate({_id: postId}, {$push: {usersLiked: userId},$inc: {likes: 1}}, {returnDocument: "after"})
                    .then(post => res.status(200).json(createResponseObject("LIKE ADDED", post)))  // VOTE FOR THE FIRST TIME    
                    .catch(error => res.status(400).json({error}))
                }else{
                    Post.findOneAndUpdate({_id: postId}, {$pull: {usersDisliked: userId}, $push:{usersLiked: userId}, $inc: {dislikes: -1, likes: 1}}, {returnDocument: "after"})
                    .then(post => res.status(200).json(createResponseObject("LIKE REPLACED DISLIKE", post)))    // SWAP VOTE
                    .catch(error => res.status(400).json({error}))
                }
            }else{
                Post.findOneAndUpdate({_id: postId}, {$pull: {usersLiked: userId}, $inc: {likes: -1}}, {returnDocument: "after"}) 
                .then(post => res.status(200).json(createResponseObject("LIKE REMOVED", post)))        // REMOVE VOTE
                .catch(error => res.status(400).json({error}))
            }
        })
        .catch(error => res.status(404).json({message: "Post not found", error: error}))    
}

exports.dislikePost = (req, res) =>{
    const postId = req.params.id;
    const userId = req.auth.userId; 

    Post.findOne({_id: postId})
        .then(post => {
            if(post.usersDisliked.includes(userId) === false){
                if(post.usersLiked.includes(userId) === false){
                    Post.findOneAndUpdate({_id: postId}, {$push: {usersDisliked: userId}, $inc: {dislikes: 1}}, {returnDocument: "after"})
                    .then(post => res.status(200).json(createResponseObject("DISLIKE ADDED", post)))  // VOTE FOR THE FIRST TIME
                    .catch(error => res.status(400).json({error}))
                }else{
                    Post.findOneAndUpdate({_id: postId}, {$pull: {usersLiked: userId}, $push: {usersDisliked: userId}, $inc: {likes: -1, dislikes: 1}}, {returnDocument: "after"})
                    .then(post => res.status(200).json(createResponseObject("DISLIKE REPLACED LIKE", post)))  // SWAP VOTE
                    .catch(error => res.status(400).json({error}))
                }
            }else{
                Post.findOneAndUpdate({_id: postId}, {$pull: {usersDisliked: userId}, $inc: {dislikes: -1}}, {returnDocument: "after"})   // REMOVE VOTE
                .then(post => res.status(200).json(createResponseObject("DISLIKE REMOVED", post)))
                .catch(error => res.status(400).json({error}))
            }
        })
        .catch(error => res.status(404).json({message: "Post not found", error: error}))
}

//////////////////////

exports.reactToPost = (req, res) =>{
    const user = req.body.userId;
    const reactionType = req.body.type;
    const postId = req.params.id;
  
    Post.findOne({_id: postId})
        .populate("reactions")
        .then(post=>{
            // console.log(post.reactions[0].user.toString())
            
            if(post.reactions.includes({$toObjectId: "user"})){        // first user reaction
                console.log("User has reacted");
                const reaction = new Reaction({
                    user: user,
                    post: postId,
                    type: reactionType,
                })
                reaction.save()                     // create reaction
                Post.findOneAndUpdate({_id: postId}, {$push: {reactions: reaction._id}})    // push reaction to array
                .then(post => {
                    let likes = 0;
                    let dislikes = 0;
                    let hates = 0;
                    let message = "";
                        if(reactionType === "like"){
                            likes++;
                            message = "liked";
                        }else if(reactionType === "dislike"){
                            dislikes++;
                            message = "disliked";
                        }else if(reactionType === "hate"){
                            hates++;
                            message = "hated";
                        }
                    
                    res.status(201).json({message: message, likes: likes, dislikes: dislikes, hates: hates});
                })  
                .catch(error => res.status(400).json({error}))
        }})
        .catch(error => res.status(404).json({message: "Post not found", error: error}))
}