const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
    res.status(200).json({mes: "THIS TEST WORKS"})
}

exports.getAll = (req, res) => {
    User.find()
        .then(users => res.status(200).json({users: users}))
        .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json({user}))
        .catch(error => res.status(404).json({message: "User not found", error: error}))
}

exports.getPosts = (req, res) => {
    Post.find({userId: req.params.id})
        .then(post => res.status(200).json({post: post}))
        .catch(error => res.status(400).json({error}))
}

exports.createUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
    });
    user.save()
        .then(()=> res.status(201).json({message: "User created"}))
        .catch(error => res.status(400).json({error}))
        })
}

exports.loginUser = (req, res) =>{
    User.findOne({email: req.body.email})
        .then(user =>{

            if(!user){
                return res.status(404).json({error: "User not found"});
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{

                    if(!valid){
                        return res.status(401).json({error: "Incorrect password"});
                    }

                    res.status(200).json({
                        userId: user._id, 
                        token: jwt.sign(
                            {userId: user._id}, 
                            "SECRET_PHRASE",
                            {expiresIn: "24h"}
                        )
                    });
                    
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}