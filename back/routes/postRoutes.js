const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postController = require("../controllers/postController");

router.post("/posts",  multer, postController.create);       // Create  // TOOK OUT AUTH TO TEST
router.get("/posts/:id", postController.getById);           // Get single post
router.get("/posts", postController.getAll);                // Get all posts
router.put("/posts/:id", auth, multer, postController.modify);    // Edit post
router.post("/posts/:id/like", auth, postController.likePost);    // Like post
router.delete("/posts/:id", auth, multer, postController.delete); // Delete post

module.exports = router;