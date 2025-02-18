const express = require("express");
const User = require("../model/userModel");
const Product = require("../model/productModel")
const adminRoutes = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/verifyToken");
const fs = require("fs")
const path = require("path")

exports.registerAdmin=async (req, res) => {
    try {
        let existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            return res.json({ message: "Admin already Registered !, Please login" })
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);
        req.body.role = 'Admin'
        req.body.password = hashPass
        admin = await User.create(req.body);
        return res.json({ message: "Admin Register success!!!", admin });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.loginAdmin= async (req, res) => {
    try {
        let existsUser = await User.findOne({ email: req.body.email });
        if (!existsUser) {
            return res.json({ message: "Admin not Found" });
        } else {
            let checkPass = await bcrypt.compare(req.body.password, existsUser.password);
            if (checkPass) {
                let token = jwt.sign({ userId: existsUser._id }, "pravesh");
                return res.json({ message: "Login Success", token })
            } else {
                return res.json({ message: 'Password  not matched...' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.adminProfile= async (req, res) => {
    try {
        return res.json({ message: "Admin Profille", Admin: req.user })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.adminUpdate=async (req, res) => {
    try {
        let admin = await User.findById(req.params.id);
        if (!admin) {
            return res.json({ message: "Admin not Found!!!" });
        }
        if (req.body.password) {
            const hashPass = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashPass;
        }
        admin = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({ message: " Admin Updated Success", updatedAdmin: admin });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.changeAdminPassword=async (req, res) => {
    try {
        // console.log(req.user);
        // console.log(req.body.oldPassword);
        // console.log(req.body);
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
    } catch (error) {
        res.status(400).json({ msg: "something went wrong" })
    }
}
exports.addProduct=async (req, res) => {
    try {
        if (req.user.role == "Admin") {
            let admin = req.user;
            let imagePath = "";
            if (req.file) {
                imagePath = `/uploads/product/${req.file.filename}`;
                req.body.productImage = imagePath;
            }
            req.body.adminid = admin._id;
            const addedProduct = await Product.create(req.body);
            if (addedProduct) {
                console.log("new Product added successfully");
                return res.json({ msg: "new Product added successfully", addedProduct });
            }
        }
        else {
            return res.json({ msg: "Login as Admin first" });
        }
    } catch (error) {
        console.error(error);
        return res.json({ msg: "Something went wrong", error: error.message });
    }
}
exports.getProduct= async (req, res) => {
    try {
        if (req.user.role == "Admin") {
            const allProduct = await Product.find({});
            if (Product.length > 0) {
                return res.json({ message: "All Product .", allProduct });
            } else {
                return res.json({ message: "No Product found." });
            }
        }
        else {
            return res.json({ msg: "Login as Admin first" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
}
exports.deleteProduct=async (req, res) => {
    try {
        if (req.user.role == "Admin") {
            const products = await Product.findById(req.params.id);
            console.log(products);
            if (products.productImage) {
                fs.unlinkSync(path.join(__dirname, "..", products.productImage))
            }
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (deletedProduct) {
                console.log("Product deleted successfully");
                return res.json({ msg: "Product deleted successfully", deletedProduct });
            }
        }
    } catch (error) {
        console.error(error);
        return res.json({ msg: "Something went wrong", error: error.message });
    }

}
exports.updateProduct=async (req, res) => {
    try {
        console.log(req.body);
        if (req.user.role == "Admin") {
            const products = await Product.findById(req.params.id);
            if (products) {
                if (req.file) {
                    if (products.productImage) {
                        fs.unlinkSync(path.join(__dirname, "..", products.productImage))
                    }
                    req.body.productImage = `/uploads/product/${req.file.filename}`
                    // req.body.adminid = admin._id;
                }
                else {
                    req.body.productImage = products.productImage
                }
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (updatedProduct) {
                    console.log(" Product updated successfully");
                    return res.json({ msg: " Product updated successfully", updatedProduct });
                }
            }
        }
    } catch (error) {
        console.error(error);
        return res.json({ msg: "Something went wrong", error: error.message });
    }

}