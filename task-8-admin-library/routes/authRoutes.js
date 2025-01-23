
const express = require('express');
const Admin = require('../model/adminModel');
const authRoutes = express.Router();
const Book = require("../model/bookModel")
const jwt= require("jsonwebtoken")
const userAuth= require("../config/auth");
const { login, loginAdmin, home, logout } = require('../controller/authController');

authRoutes.get("/", login)
authRoutes.post("/loginAdmin", loginAdmin)
authRoutes.get("/home",userAuth, home)
authRoutes.get("/logout",userAuth, logout)


module.exports = authRoutes;
