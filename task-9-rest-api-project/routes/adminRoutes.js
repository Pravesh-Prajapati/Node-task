const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { registerAdmin, loginAdmin, adminProfile, updateAdmin, addBlog, getAllBlog,singleBlog, deleteBlog, updateBlog } = require("../controllers/adminController");
const Blog=require("../models/blogModels")

const routes = express.Router();



routes.post("/register", registerAdmin);
routes.post("/login", loginAdmin);
routes.get("/viewProfile", verifyToken, adminProfile);
routes.put("/updateAdmin/:id",verifyToken, updateAdmin);


routes.post("/addBlog",verifyToken,Blog.uploadImageBlog,addBlog);
routes.get("/getAllBlog",verifyToken,getAllBlog);
routes.get("/singleBlog/:id",verifyToken,singleBlog);
routes.delete("/deleteBlog/:id",verifyToken, Blog.uploadImageBlog,deleteBlog);
routes.put("/updateBlog/:id",verifyToken,Blog.uploadImageBlog,updateBlog);


module.exports = routes;