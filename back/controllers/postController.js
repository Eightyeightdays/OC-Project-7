const Post = require("../models/postModel");
const Reaction = require("../models/reactionmodel");
const User = require("../models/userModel");
const fs = require("fs");
const moment = require("moment");

exports.create = (req, res) => {
    req.body.title = req.body.title.replace(/&#x27;/g, "'");
    req.body.content = req.body.content.replace(/&#x27;/g, "'");

    const post = new Post({
        ...req.body,
        userId: req.auth.userId,
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
    req.body.title = req.body.title.replace(/&#x27;/g, "'");    // allow apostrophes
    req.body.content = req.body.content.replace(/&#x27;/g, "'");

    if (req.auth.userId !== req.body.userId && !req.auth.admin) {
        return res.status(403).json({message: "You don't have permission to edit this post"})
    } else {
        const updatedPost = req.file ?
            {
                ...req.body,
                dateEdited: moment().format('Do MMMM YYYY, h:mm a'),
                imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            } : {...req.body, dateEdited: moment().format('Do MMMM YYYY, h:mm a')};

        Post.updateOne({_id: req.params.id}, {...updatedPost, _id: req.params.id})
            .then(() => res.status(200).json({message: "Post updated"}))
            .catch(error => res.status(400).json({error}))
    }
}

exports.delete = (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post => {
            if (req.auth.userId !== post.userId && !req.auth.admin) {
                return res.status(403).json({message: "You don't have permission to delete this post"})
            }
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Post deleted"}))
                    .catch(error => res.status(400).json({error}))
            });
        })
        .catch(error => res.status(500).json({error}));
}

exports.reactToPost = async (req, res) => {
    const reactionType = req.body.type;
    const postId = req.params.id;
    const post = await Post.findOne({_id: postId});
    const user = await User.findById(req.auth.userId);

    if (!post || !user) {
        return res.status(400) // bad request
    }

    let reaction = await Reaction.findOne({user: user._id, post: post._id}) // search for a reaction by the user for the specific post

    if (!reaction) {                    // if there is no reaction
       reaction = await new Reaction({  // create a new one
            user: user._id,
            post: post._id,
            type: reactionType
        }).save()
        await Post.updateOne({_id: postId}, {$addToSet: {reactions: reaction._id}, $inc: {reactionCount: 1}}) // add the new reaction to the post // 

    } else if (reaction.type === reactionType) { // if the new reaction is the same as the old one
        await reaction.deleteOne()              // delete the reaction
        await Post.updateOne({_id: postId}, {$pull: {reactions: reaction._id}, $inc: {reactionCount: -1}}) // update the reactions array on the post
    } else {
      await Reaction.updateOne({_id: reaction._id}, {type: reactionType})   // if the reaction is different, update the reaction type
    }

    const reactionCount = await Reaction.find({post: post._id}).count(); // count total reactions for post

    res.status(200).json({reactionCount: reactionCount})    // use count to update state on front end
}




