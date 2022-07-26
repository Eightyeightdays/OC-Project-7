const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sanitize = require("../middleware/express-sanitize");

const postController = require("../controllers/postController");

router.post("/post",  auth, multer, sanitize, postController.create);     // Create
router.get("/post/:id", auth, postController.getById);                    // Get single post
router.get("/post", auth, postController.getAll);                         // Get all posts
router.put("/post/:id", auth, multer, sanitize, postController.modify);   // Edit post
router.delete("/post/:id", auth, multer, postController.delete);          // Delete post
router.post("/post/:id/react", auth, postController.reactToPost);         // React to post

module.exports = router;
