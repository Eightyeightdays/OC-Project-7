const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sanitize = require("../middleware/express-sanitize");

const postController = require("../controllers/postController");

router.post("/posts",  auth, multer, sanitize, postController.create);      // Create  
router.get("/posts/:id", auth, postController.getById);                     // Get single post
router.get("/posts", auth, postController.getAll);                          // Get all posts
router.put("/posts/:id", auth, multer, sanitize, postController.modify);    // Edit post
router.post("/posts/:id/like", auth, postController.likePost);              // Like post
router.post("/posts/:id/dislike", auth, postController.dislikePost);        // Dislike post
router.delete("/posts/:id", auth, multer, postController.delete);           // Delete post
router.post("/posts/:id/react", postController.reactToPost);      // React to post

module.exports = router;