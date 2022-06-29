const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postController = require("../controllers/postController");

// TOOK OUT AUTH TO TEST
router.post("/posts",  multer, postController.create);       // Create  
router.get("/posts/:id", postController.getById);           // Get single post
router.get("/posts", postController.getAll);                // Get all posts
router.put("/posts/:id", multer, postController.modify);    // Edit post
router.post("/posts/:id/like", postController.likePost);    // Like post
router.delete("/posts/:id", multer, postController.delete); // Delete post

module.exports = router;