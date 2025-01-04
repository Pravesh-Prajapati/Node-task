const express = require("express")
const userRouter = express.Router()
const User = require("../model/authModel")
const Blog = require("../model/blogModel")
const { SignUpPage, SignInPage, homePage, signUp, signIn, logOut } = require("../controller/authController")
const passport = require("passport");

userRouter.get("/", SignUpPage)
userRouter.post("/signUp", User.uploadImage, signUp)
userRouter.get("/signInPage", SignInPage)
userRouter.post("/signIn",passport.authenticate('local', {failureRedirect: "/signInPage"}), signIn)
userRouter.get("/home",passport.validateUser, homePage)
userRouter.get("/logout", logOut)

module.exports = userRouter