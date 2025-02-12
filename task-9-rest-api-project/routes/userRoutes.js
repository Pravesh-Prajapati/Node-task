const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const Blog = require("../models/blogModels");
const { registerUser, getAllBlogs, singleBlog, loginUser, createComment, deleteUser, updateUser, userProfile, deleteComment } = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/getAllBlog", getAllBlogs);
userRoutes.get("/singleBlog/:id", singleBlog);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/comment/:id", verifyToken, createComment);
userRoutes.delete("/deleteUser/:id", verifyToken, deleteUser)
userRoutes.put("/updateUser/:id", verifyToken, updateUser)
userRoutes.get("/userProfile", verifyToken, userProfile)
userRoutes.delete("/deleteComment/:id", verifyToken, deleteComment)

module.exports = userRoutes;