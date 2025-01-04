const User = require("../model/authModel")
const Blog = require("../model/blogModel")
const path = require("path")
const fs = require("fs")

exports.SignUpPage = (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect("/home")
        }
        else{
            return res.render("signUp")
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect("/")
    }
    // res.render("signUp")
}
exports.SignInPage = (req, res) => {
    
    try {
        if (req.isAuthenticated()) {
            return res.redirect("/home")
        }
        else {
            res.render("signIn")
        }
    } catch (error) {
        console.log(error);
        return res.redirect("signInPage")
    }
}
exports.homePage = async (req, res) => {
    try {
        const category = req.query.category;
        let allBlog;
        if (category && category !== 'All') {
            allBlog = await Blog.find({ category });
            // console.log(allBlog);
        } else {
            allBlog = await Blog.find();
        }
        return res.render("home", { allBlog });
    } catch (error) {
        console.log(error);
        return res.redirect("/home")
    }

}
exports.signUp = async (req, res) => {
  
    try {
        let existingUserEmail = await User.findOne({ email: req.body.email })
        let existingUserName = await User.findOne({ firstName: req.body.firstName })
        // console.log(existingUserEmail);
        // console.log(existingUserName);
        if (existingUserEmail || existingUserName) {
            console.log("Email or username Already in use Try another email");
            res.redirect("/")
        }
        else {
            let imagePath = ""
            if (!req.file) {
                imagePath = ""
                req.body.profileImage = imagePath;
                let newUser = await User.create(req.body);
                if (newUser) {
                    console.log("New User Register without profile image...");
                    return res.redirect("/SignInPage")
                }
                else {
                    console.log("Something wrong");
                    return res.redirect("/")
                }
            }
            else {
                imagePath = `/uploads/users/${req.file.filename}`
                req.body.profileImage = imagePath;
                let newUser = await User.create(req.body);
                if (newUser) {
                    console.log("New User Register with profile image...");
                    return res.redirect("/SignInPage")
                }
            }

        }

    } catch (error) {
        console.log(error);
    }
}
exports.signIn = async (req, res) => {
    try {
        console.log("Login Success.....",req.user);
        return res.redirect("/home")
    } catch (error) {
        console.log(error);
    }

}
exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("/signInPage");
    })
}