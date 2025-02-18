const express = require("express");
const User = require("../model/userModel");
const userRoutes = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verifyToken");
const Product = require("../model/productModel");

exports.registerUser= async (req, res) => {
    try {
        let existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            return res.json({ message: "Email Already Exists" })
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);
        req.body.role = 'Users'
        req.body.password = hashPass
        admin = await User.create(req.body);
        return res.json({ message: "User Register success!!!", admin });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.loginUser= async (req, res) => {
    try {
        let existsUser = await User.findOne({ email: req.body.email });
        if (!existsUser) {
            return res.json({ message: "Admin not Found" });
        }
        else {
            if (existsUser.role == "Users") {
                console.log(existsUser);
                let checkPass = await bcrypt.compare(req.body.password, existsUser.password);
                if (checkPass) {
                    let token = jwt.sign({ userId: existsUser._id }, "pravesh");
                    return res.json({ message: "Login Success", token })
                } else {
                    return res.json({ message: 'Password  not matched...' });
                }
            }
            else {
                return res.json({ message: 'Please Login as admin' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.userProfile=async (req, res) => {
    try {
        console.log(req.user);
        if (req.user.role=="Users") {
            return res.json({ message: "User Profile", User: req.user }) 
        }
        else{
            return res.json({ message: "login as User First"});
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.changeUserPassword=async (req, res) => {
    try {
        // console.log(req.user);
        // console.log(req.body.oldPassword);
        // console.log(req.body);
        let loginUser = await User.findById(req.params.id)
        console.log(loginUser);
        if (loginUser.role == "Users") {
            if (await bcrypt.compare(req.body.oldPassword, req.user.password)) {
                if (req.body.oldPassword != req.body.newPassword) {
                    if (req.body.newPassword == req.body.confirmPassword) {
                        let hashPash = await bcrypt.hash(req.body.newPassword, 10)
                        let updatedPass = await User.findByIdAndUpdate(req.user._id, { password: hashPash })
                        if (updatedPass) {
                            console.log("admin password changed success");
                            res.status(200).json({ msg: "admin password changed success", updatedPass })
                        }
                    }
                    else {
                        console.log("new password and confirm password must be same");
                        res.status(200).json({ msg: "new password and confirm password must be same" })
                    }
                }
                else {
                    console.log("old password and new password is same try another password");
                    res.status(200).json({ msg: "old password and new password is same try another password" })
                }
            }
        }
        else{
            res.status(200).json({ msg: "Login As user First" })
        }
    } catch (error) {
        res.status(400).json({ msg: "something went wrong" })
    }
}
exports.viewAllProduct=async (req,res) => {
    try {
        if (req.user.role=="Users") {
            let allProduct= await Product.find({})
            res.status(200).json({ msg: "all Product",allProduct })
        }
    } catch (error) {
        res.status(400).json({ msg: "something went wrong" })
    }
}
exports.viewSingleProduct=async (req,res) => {
    try {
        if (req.user.role=="Users") {
            let singleProduct= await Product.findById(req.params.id)
            res.status(200).json({ msg: "all Product",singleProduct })
        }
    } catch (error) {
        res.status(400).json({ msg: "something went wrong" })
    }
}