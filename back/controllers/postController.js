const Post = require("../models/postModel");
const Reaction = require("../models/reactionmodel");
const User = require("../models/userModel");
const fs = require("fs");
const dayjs = require("dayjs");

function rebuild(req){
    let title = req.body.title.replace(/&#x27;/g, "'");         // put apostrophes in
    let content = req.body.content.replace(/&#x27;/g, "'");
    title = title.replace(/&quot;/g, "\"");                     // put quotation marks in
    content = content.replace(/&quot;/g, "\"");
    let paragraphs = (content.split(/\r?\n/g));                 // put paragraphs in
    let indentedText=""; 
    paragraphs.map(el =>{
        indentedText += el + "\n";
    })

    return [title, indentedText];
}

exports.create = (req, res) => {
    const [title, indentedText] = rebuild(req);

    const post = new Post({
        title: title,
        content: indentedText,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        dateCreated: dayjs().format("dddd, MMMM D YYYY, HH:mm:ss a"),
        sortDate: Date.now(),
    });

    post.save()
        .then(() => res.status(201).json({message: "Post created"}))
        .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    Post.findOne({_id: req.params.id})
        .populate("reactions")
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({error}))
}

exports.getAll = (req, res) => {
    Post.find()
        .populate("reactions")
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}))
}

exports.modify = (req, res) => {
    const [title, indentedText] = rebuild(req);
    Post.findOne({_id: req.params.id})
        .then(post =>{
            if (req.auth.userId !== post.userId && !req.auth.admin) {
            return res.status(403).json({message: "You don't have permission to edit this post"})
            } else {
                const updatedPost = req.file ?
                    {
                        title: title,
                        content: indentedText,
                        dateEdited: dayjs().format("dddd, MMMM D YYYY, HH:mm:ss a"),
                        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                    } : {
                        title: title, 
                        content: indentedText, 
                        dateEdited: dayjs().format("dddd, MMMM D YYYY, HH:mm:ss a")
                    };
                if(req.file){
                    const filename = post.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, ()=>{
                        Post.updateOne({_id: req.params.id}, {...updatedPost, _id: req.params.id})
                        .then(() => res.status(200).json({message: "Post updated, previous file deleted"}))
                        .catch(error => res.status(400).json({error}))
                    })
                }else{
                    Post.updateOne({_id: req.params.id}, {...updatedPost, _id: req.params.id})
                    .then(() => res.status(200).json({message: "Post updated"}))
                    .catch(error => res.status(400).json({error}))
                }
            }    
        })
        .catch(error => res.status(400).json({error}))
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
                    .then(() => {
                        Reaction.deleteMany({post: req.params.id})
                        .then(result => res.status(200).json({deleteStatus: result.acknowledged, reactionsDeleted: result.deletedCount, message: "post deleted"}))
                        .catch(error => res.status(400).json({error}))
                    })
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
        await Post.updateOne({_id: postId}, {$addToSet: {reactions: reaction._id}}) // add the new reaction to the post // 

    } else if (reaction.type === reactionType) { // if the new reaction is the same as the old one
        await reaction.deleteOne()              // delete the reaction
        await Post.updateOne({_id: postId}, {$pull: {reactions: reaction._id}}) // update the reactions array on the post
    } else {
      await Reaction.updateOne({_id: reaction._id}, {type: reactionType})   // if the reaction is different, update the reaction type
    }

    const reactionCount = await Reaction.find({post: post._id}).count(); // count total reactions for post

    res.status(200).json({reactionCount: reactionCount})    // use count to update state on front end
}