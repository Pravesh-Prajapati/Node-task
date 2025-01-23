const express = require("express");
const Category = require("../model/categoryModel");
const categoryRoutes = express.Router()
const fs = require("fs")
const path = require("path")
const Book = require("../model/bookModel");
const subCategory = require("../model/subCategoryModel");

exports.addCategoryPage= async (req, res) => {
    try {
        return res.render("category/addCategory")
    } catch (error) {
        console.log("error", error);
    }
}
exports.addCategory= async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);
        let imagePath = ""
        if (req.file) {
            imagePath = `/uploads/category/${req.file.filename}`
        }
        req.body.categoryImage = imagePath
        let addcategory = await Category.create(req.body)
        if (addcategory) {
            console.log("category Added success");
            return res.redirect("/admin/viewCategoryPage")
        }
        else {
            console.log("category not Added ");
            return res.render("back")
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.viewCategoryPage=async (req, res) => {
    try {
        let allcategory = await Category.find({})
        if (allcategory) {
            return res.render("category/viewCategory", { allcategory })
        }
        else {
            console.log("something wrong");
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.deleteCategory=async (req, res) => {
    try {
        let category = await Category.findById(req.params.id)
        if (category) {
            if (category.categoryImage) {
                fs.unlinkSync(path.join(__dirname, "..", category.categoryImage))
            }
            const dltcategory = await Category.findByIdAndDelete(req.params.id)
            if (dltcategory) {
                console.log("category deleted success");
            }
            // =============subcategory deleting
            const subCategories = await subCategory.find({ categoryId: category.id })
            // console.log("subcategory",subCategories);
            if (subCategories) {
                await subCategory.deleteMany({ categoryId: category.id })
            }

            // =============books deleting
            const books = await Book.find({ categoryId: category.id })
            // console.log("books", books);
            if (books) {
                books.forEach(book => {
                    // console.log(book.bookImage);
                    if (book.bookImage) {
                        fs.unlinkSync(path.join(__dirname, "..", book.bookImage))
                    }
                });
                await Book.deleteMany({ categoryId: category.id })
            }
            res.redirect("/admin/viewCategoryPage")
        }
        else {
            console.log("something wrong");
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.editCategoryPage=async (req, res) => {
    try {
        let category = await Category.findById(req.params.id)
        if (category) {
            return res.render("category/editCategory", { category })
        }
        else {
            console.log("something wrong");
        }
    } catch (error) {
        console.log("error", error);
    }
}
exports.editCategory=async (req, res) => {
    try {
        let category = await Category.findById(req.params.id)
        if (category) {
            if (req.file) {
                if (category.categoryImage != "" && category.categoryImage) {
                    fs.unlinkSync(path.join(__dirname, "..", category.categoryImage))
                }
                req.body.categoryImage = `/uploads/category/${req.file.filename}`
            }
            else {
                req.body.categoryImage = category.categoryImage
            }
            let updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body)
            if (updatedCategory) {
                console.log("admin updated ");
                return res.redirect("/admin/viewCategoryPage")
            }
            else {
                console.log("admin not updated success");
            }
        }
        else {

        }
    } catch (error) {
        console.log("error", error);
    }
}