const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAll);        
router.get("/users/:id", userController.getById);
router.get("/users/:id/posts", userController.getPosts);
router.post("/auth/signup", userController.createUser);
router.post("/auth/login", userController.loginUser);
router.post("/auth/logout", userController.logoutUser);

module.exports = router;