const express = require('express');
const Admin = require('../model/adminModel');
const authRoutes = express.Router();
const Book = require("../model/bookModel")
const jwt= require("jsonwebtoken")
const userAuth= require("../config/auth")

exports.login = async (req, res) => {
    const token = req.cookies.adminToken;
    if (token) {
        return res.redirect("/home");
    }
    return res.render("login")
}
exports.loginAdmin=async (req, res) => {
    try {
        const existsAdmin = await Admin.findOne({ email: req.body.email })
        if (existsAdmin) {
            if (existsAdmin.password == req.body.password) {
                // console.log(existsAdmin);
                let token = jwt.sign({ adminToken: existsAdmin }, "AdminSecretKey")
                // console.log(token);
                res.cookie("adminToken", token);
                return res.redirect("/home")
            }
            else {
                console.log("incorrect password");
                return res.redirect("back")
            }
        }
        else {
            console.log("email doesnt exists");
            return res.redirect("back")
        }
    } catch (error) {
        console.log(error);
    }
}
exports.home=async (req, res) => {
    try {
        const allbooks = await Book.find({}).populate("categoryId").populate("subCategoryId")
        return res.render("home", {allbooks})
    } catch (error) {
        console.log(error);
    }
}
exports.logout=async (req, res) => {
    res.clearCookie("adminToken");
    return res.redirect("/home")
}