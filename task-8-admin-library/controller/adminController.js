const express = require('express');
const Admin = require('../model/adminModel');
const adminRoutes = express.Router();
const fs = require("fs")
const path = require("path")

exports.addAdminPage = async (req, res) => {
    return res.render("admin/addAdmin")
}
exports.addAdmin = async (req, res) => {
    try {
        let adminExists = await Admin.findOne({ email: req.body.email })
        if (adminExists) {
            console.log("email alredy exists");
            res.redirect("back")
        }
        else {
            let imagePath = ""
            if (req.file) {
                imagePath = `/uploads/admins/${req.file.filename}`
            }
            req.body.profileImage = imagePath
            let rec = await Admin.create(req.body)
            if (rec) {
                console.log("new admin added success");
                res.redirect("/admin/viewAdminPage")
            }
            else {
                console.log("something went wrong");
                res.redirect("back")
            }
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.viewAdminPage = async (req, res) => {
    try {
        let admins = await Admin.find({})
        if (admins) {
            // console.log(admins);
            return res.render("admin/viewAdmin", { admins })
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.deleteAdmin = async (req, res) => {
    try {
        let rec = await Admin.findById(req.params.id)
        if (rec) {
            if (rec.profileImage) {
                fs.unlinkSync(path.join(__dirname, "..", rec.profileImage))
            }
            let deleteRecord = await Admin.findByIdAndDelete(req.params.id)
            if (deleteRecord) {
                console.log("Admin deleted success");
                res.clearCookie("adminToken");
                return res.redirect("/")
            }
            else {
                console.log("Admin not deleted");
                return res.redirect("back")
            }
        }
    } catch (error) {
        console.log(error);
        return res.redirect("back")
    }
}
exports.editAdminPage = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id)
        if (admin) {
            return res.render("admin/editAdmin", { admin })
        }
        else {
            console.log("something wrong");
            return res.redirect("back")
        }
    } catch (error) {
        console.log(error);
        return res.redirect("back")
    }
}
exports.updateAdmin = async (req, res) => {
    try {
        let rec = await Admin.findById(req.params.id)
        // console.log(rec);
        // console.log(req.body);
        if (rec) {
            if (req.file) {
                if (rec.profileImage && rec.profileImage != "") {
                    fs.unlinkSync(path.join(__dirname, "..", rec.profileImage))
                }
                req.body.profileImage = `/uploads/admins/${req.file.filename}`
            }
            else {
                req.body.profileImage = rec.profileImage
            }
            const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedAdmin) {
                console.log("admin updated");
                res.redirect(`/admin/viewAdminPage`)
            }
            else {
                console.log("admin not updated");
                res.redirect("back")
            }
        }
        else {
            console.log("Something went wrong");
            res.redirect("back")
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.loginAdminPage = async (req, res) => {
    return res.render("login")
}
exports.viewProfile = async (req, res) => {
    let loginUserprofile = req.user.adminToken;
    console.log(loginUserprofile);
    return res.render("admin/viewProfile", {loginUserprofile})
}