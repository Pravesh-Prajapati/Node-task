const express = require("express")
const blogRouter = express.Router()
const Blog = require("../model/blogModel")
const User = require("../model/authModel")
const path = require("path")
const fs = require("fs")
const { addBlogPage, addBlog, singleBlog, profilePage, deleteBlog, editBlogPage, changePasswordPage, changePassword, editProfilePage, editProfile, editBlog } = require("../controller/blogController")

blogRouter.get("/addBlogPage", addBlogPage)
blogRouter.post("/addBlog", Blog.uploadImage, addBlog)

blogRouter.get("/singleBlog/:id", singleBlog)
blogRouter.get("/profilePage", profilePage)
blogRouter.get("/deleteBlog/:id", deleteBlog)

blogRouter.get("/editBlogPage/:id", editBlogPage)
blogRouter.post("/editBlog/:id", Blog.uploadImage, editBlog)

blogRouter.get("/changePasswordPage", changePasswordPage)
blogRouter.post("/changePassword", changePassword)

blogRouter.get("/editProfilePage" , editProfilePage)
blogRouter.post("/editProfile/:id", User.uploadImage, editProfile)
module.exports = blogRouter