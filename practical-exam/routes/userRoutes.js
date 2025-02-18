const express = require("express");
const User = require("../model/userModel");
const userRoutes = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verifyToken");
const Product = require("../model/productModel");
const { registerUser, loginUser, userProfile, changeUserPassword, viewAllProduct, viewSingleProduct } = require("../controller/userController");

userRoutes.post("/registerUser",registerUser)
userRoutes.post("/loginUser", loginUser)
userRoutes.get("/userProfile", verifyToken, userProfile)
userRoutes.post("/changeUserPassword/:id", verifyToken, changeUserPassword)
userRoutes.get("/viewAllProduct",verifyToken,viewAllProduct)
userRoutes.get("/viewSingleProduct/:id",verifyToken,viewSingleProduct)


module.exports = userRoutes