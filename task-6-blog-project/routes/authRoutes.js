const express = require("express")
const userRouter = express.Router()
const User = require("../model/authModel")
const Blog = require("../model/blogModel")
const { SignUpPage, SignInPage, homePage, signUp, signIn, logOut } = require("../controller/authController")

userRouter.get("/", SignUpPage)
userRouter.get("/signInPage", SignInPage)
userRouter.get("/home", homePage)
userRouter.post("/signUp", User.uploadImage, signUp)
userRouter.post("/signIn", signIn)
userRouter.get("/logout", logOut)

module.exports = userRouter