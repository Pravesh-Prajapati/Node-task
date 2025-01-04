const express = require("express")
const blogRouter = express.Router()
const Blog = require("../model/blogModel")
const User = require("../model/authModel")
const path = require("path")
const fs = require("fs")
const { addBlogPage, addBlog, singleBlog, profilePage, deleteBlog, editBlogPage, changePasswordPage, changePassword, editProfilePage, editProfile, editBlog } = require("../controller/blogController")
const passport = require("passport");

blogRouter.get("/addBlogPage", passport.validateUser, addBlogPage)
blogRouter.post("/addBlog", Blog.uploadImage, addBlog)

blogRouter.get("/singleBlog/:id", passport.validateUser, singleBlog)
blogRouter.get("/profilePage", passport.validateUser, profilePage)
blogRouter.get("/deleteBlog/:id", passport.validateUser, deleteBlog)

blogRouter.get("/editBlogPage/:id", passport.validateUser, editBlogPage)
blogRouter.post("/editBlog/:id", Blog.uploadImage, editBlog)

blogRouter.get("/changePasswordPage", passport.validateUser, changePasswordPage)
blogRouter.post("/changePassword", changePassword)

blogRouter.get("/editProfilePage" ,  passport.validateUser, editProfilePage)
blogRouter.post("/editProfile/:id", User.uploadImage, editProfile)
module.exports = blogRouter