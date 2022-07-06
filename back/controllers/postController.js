const Post = require("../models/postModel");
const fs = require("fs");
const moment = require('moment'); 

exports.create = (req, res) => {
    const postObject = req.body;
    const post = new Post({
        ...postObject,
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
    if(req.auth.userId !== req.body.userId){   
        return res.status(403).json({message: "You don't have permission to edit this post"})
    }else{
        const updatedPost = req.file ?
        {
            ...JSON.parse(req.body.post),
            displayDateEdited: moment().format('Do MMMM YYYY, h:mm a'),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : {...req.body, displayDateEdited: moment().format('Do MMMM YYYY, h:mm a')};
        
           
        Post.updateOne({_id: req.params.id}, {...updatedPost, _id: req.params.id})   // NOTE: req.params.id = req.body._id
        .then(()=> res.status(200).json({message: "Post updated"}))
        .catch(error => res.status(400).json({error}))
    }
}

exports.likePost = (req, res) => {
    const postId = req.params.id;
    const userId = req.auth.userId; 
    
    Post.findOne({_id: postId})
        .then(post => {
            if(req.body.vote === "like"){
                if(post.usersLiked.includes(userId) === false){
                    if(post.usersDisliked.includes(userId) === false){
                        Post.updateOne({_id: postId}, {$push: {usersLiked: userId},$inc: {likes: 1}})
                        .then(() => res.status(200).json({message: "Post liked"}))
                        .catch(error => res.status(400).json({error}))
                    }else{
                        Post.updateOne({_id: postId}, {$pull: {usersDisliked: userId}, $push:{usersLiked: userId}, $inc: {dislikes: -1, likes: 1}})
                        .then(() => res.status(200).json({message: "Post liked SECOND CASE"}))
                        .catch(error => res.status(400).json({error}))
                    }
                }else{
                    return res.status(400).json({error: "You can't like more than once!"});
                }
            }else if(req.body.vote === "dislike"){
                if(post.usersDisliked.includes(userId) === false){
                    if(post.usersLiked.includes(userId) === false){
                        Post.updateOne({_id: postId}, {$push: {usersDisliked: userId}, $inc: {dislikes: 1}})
                        .then(() => res.status(200).json({message: "Post disliked"}))
                        .catch(error => res.status(400).json({error}))
                    }else{
                        Post.updateOne({_id: postId}, {$pull: {usersLiked: userId}, $push: {usersDisliked: userId}, $inc: {likes: -1, dislikes: 1}})
                        .then(() => res.status(200).json({message: "Post disliked SECOND CASE"}))
                        .catch(error => res.status(400).json({error}))
                    }
                }else{
                    return res.status(400).json({error: "You can't dislike more than once!"});
                }
            }
        })
        .catch(error => res.status(404).json({message: "Post not found", error: error}))
}

exports.delete = (req, res) =>{
    Post.findOne({_id: req.params.id})
        .then(post =>{
            if(req.auth.userId !== post.userId){
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
