const User = require("../model/authModel")
const Blog = require("../model/blogModel")
const path = require("path")
const fs = require("fs")

exports.SignUpPage = (req, res) => {
    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            res.render("signUp")
        }
        else {
            return res.redirect("home")
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/")
    }
}
exports.SignInPage = (req, res) => {
    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            res.render("signIn")
        }
        else {
            return res.redirect("home")
        }
    } catch (error) {
        console.log(error);
        return res.redirect("signInPage")
    }
}
exports.homePage = async (req, res) => {
    // try {
    //     if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
    //         return res.redirect("/signInPage")
    //     }
    //     else {
    //         let allBlog = await Blog.find()
    //         // console.log(allBlog);
    //         return res.render("home", { allBlog })
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            return res.redirect("/signInPage")
        }
        else {
            const category = req.query.category;
            let allBlog;
            if (category && category !== 'All') {
                allBlog = await Blog.find({ category });
            } else {
                allBlog = await Blog.find();
            }
            return res.render("home", { allBlog });
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/home")
    }

}
exports.signUp = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    // res.redirect("/")
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
            let imagePath=""
            if (!req.file) {
                imagePath = ""
                req.body.profileImage = imagePath;
                let newUser = await User.create(req.body);
                if (newUser) {
                    console.log("New User Register without profile image...");
                    return res.redirect("/SignInPage")
                }
                else{
                    console.log("Something wrong");
                    return res.redirect("/")
                }
            }
            else{
                imagePath=`/uploads/users/${req.file.filename}`
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
    // try {
    //     let imagePath = ""
    //     if (req.file) {
    //         imagePath = `/uploads/users/${req.file.filename}`
    //     }
    //     req.body.profileImage = imagePath;
    //     let newUser = await User.create(req.body);
    //     if (newUser) {
    //         console.log("New User Register...");
    //         return res.redirect("/signInPage")
    //     } else {
    //         console.log("Somthing Went Wrong...");
    //         return res.redirect("back")
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}
exports.signIn = async (req, res) => {
    try {
        let loginUser = await User.findOne({ email: req.body.email })
        // console.log(rec);
        if (loginUser) {
            if (loginUser.password == req.body.password) {
                console.log("Login Success.....");
                res.cookie("loginUser", loginUser)
                return res.redirect("/home")
            }
            else {
                console.log("Wrong Password");
                res.redirect("/signInPage")
            }
        }
        else {
            console.log("Email doesnot exists Register Please");
            return res.redirect("/")
        }
    } catch (error) {
        console.log(error);
    }
    // res.redirect("/home")
    // res.redirect("/signInPage")
}
exports.logOut = (req, res) => {
    res.clearCookie("loginUser");
    res.redirect("/signInPage")
}