const express = require("express");
const User = require("../model/userModel");
const Product = require("../model/productModel")
const adminRoutes = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verifyToken");
const fs = require("fs")
const path = require("path");
const { registerAdmin, loginAdmin, adminProfile, adminUpdate, changeAdminPassword, addProduct, getProduct, deleteProduct, updateProduct } = require("../controller/adminController");

adminRoutes.post("/registerAdmin", registerAdmin)
adminRoutes.post("/loginAdmin",loginAdmin)
adminRoutes.get("/adminProfile", verifyToken,adminProfile)
adminRoutes.post("/adminUpdate/:id", verifyToken, adminUpdate)
adminRoutes.post("/changeAdminPassword/:id", verifyToken, changeAdminPassword)
adminRoutes.post("/addProduct", verifyToken, Product.uploadImage, addProduct)
adminRoutes.get("/getProduct", verifyToken,getProduct)
adminRoutes.get("/deleteProduct/:id", verifyToken, deleteProduct)
adminRoutes.post("/updateProduct/:id", Product.uploadImage, verifyToken, updateProduct)



module.exports = adminRoutes