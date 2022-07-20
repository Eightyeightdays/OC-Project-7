const Post = require("../models/postModel");
const Reaction = require("../models/reactionModel");
const User = require("../models/userModel");

exports.likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.auth.userId);
    const type = req.body.type;

    if (!user || !post || !type) {
        res.status(400).json({'Message': 'Bad request'});

        return;
    }

    let reaction = await Reaction.findOne({user: user._id, post: post._id})

    if (!reaction) {
        await new Reaction({
            user: user._id,
            post: post._id,
            type: type
        }).save()

    } else if (reaction.type === type) {
        await reaction.deleteOne()
    } else {
        Reaction.updateOne({_id : reaction._id}, {type : type})
    }

    const likeCount = await Reaction.find({post: post._id, type: 'like'}).count();
    const dislikeCount = await Reaction.find({post: post._id, type: 'dislike'}).count();

    return res.json({likeCount: likeCount, dislikeCount: dislikeCount});

}
