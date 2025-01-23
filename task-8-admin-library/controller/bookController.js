const express = require('express');
const Admin = require('../model/adminModel');
const bookRoutes = express.Router();
const fs = require("fs")
const path = require("path")
const Category = require("../model/categoryModel")
const subCategory = require("../model/subCategoryModel")
const Book = require("../model/bookModel")

exports.addBookPage=async (req, res) => {
    try {
        const categories = await Category.find({});
        const subCategories = await subCategory.find({});
        if (categories && subCategories) {
            return res.render("book/addbook", { categories, subCategories });
        } else {
            console.log("No categories and subcategory found");
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.getsubcategories=async (req, res) => {
    let category = await Category.findById(req.params.id);
    let subCategories = await subCategory.find({ categoryId: category._id })
    // console.log(subCategories);
    return res.json({ subCategories })
}
exports.addbook=async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);
        let imagePath = ""
        if (req.file) {
            imagePath = `/uploads/books/${req.file.filename}`
        }
        const loginUserName = req.user.adminToken.firstName + req.user.adminToken.lastName
        const loginUserEmail = req.user.adminToken.email
        req.body.bookImage = imagePath
        req.body.bookPublisher = loginUserName
        req.body.publisherEmail = loginUserEmail

        let rec = await Book.create(req.body)
        if (rec) {
            console.log("new Book added success");
            res.redirect("/admin/viewBook")
        }
        else {
            console.log("something went wrong");
            res.redirect("back")
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.viewbook=async (req, res) => {
    try {
        let allBooks = await Book.find().populate("categoryId").populate("subCategoryId")
        // console.log(SubCategories);
        if (allBooks) {
            return res.render("book/viewbook", { allBooks });
        } else {
            console.log("No subcategories found");
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.deleteBook=async (req, res) => {
    try {
        let rec = await Book.findById(req.params.id)
        if (rec) {
            if (rec.bookImage) {
                fs.unlinkSync(path.join(__dirname, "..", rec.bookImage))
            }
            let dltbook = await Book.findByIdAndDelete(req.params.id)
            if (dltbook) {
                console.log("book deleted success");
                res.redirect("/admin/viewBook")
            }
        } else {
            console.log("No books found");
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.editBookPage=async (req, res) => {
    try {
        let book = await Book.findById(req.params.id).populate("categoryId").populate("subCategoryId");
        // console.log(book);

        let categories = await Category.find();
        let subCategories = await subCategory.find();
        if (book) {
            return res.render("book/editbook", {
                book,
                categories,
                subCategories
            });
        } else {
            console.log("Book not found");
            res.redirect("back");
        }
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send("Internal Server Error");
    }
}
exports.editBook=async (req, res) => {
    try {
        let rec = await Book.findById(req.params.id)
        // console.log(rec);
        if (rec) {
            if (req.file) {
                if (rec.bookImage != "" && rec.bookImage) {
                    fs.unlinkSync(path.join(__dirname, "..", rec.bookImage))
                }
                req.body.bookImage = `/uploads/books/${req.file.filename}`
            }
            else {
                req.body.bookImage = rec.bookImage
            }
            const loginUserName = req.user.adminToken.firstName + req.user.adminToken.lastName
            const loginUserEmail = req.user.adminToken.email
            req.body.bookPublisher = loginUserName
            req.body.publisherEmail = loginUserEmail

            const updatedbook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedbook) {
                console.log("book updated successfully");
                return res.redirect("/admin/viewbook");
            } else {
                console.log("book update failed");
                return res.redirect("back");
            }
        }
        return res.redirect(`/admin/editbookPage/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }
}