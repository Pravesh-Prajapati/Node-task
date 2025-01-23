const express = require('express');
const Admin = require('../model/adminModel');
const subCategoryRoutes = express.Router();
const fs = require("fs")
const path = require("path")
const Category = require("../model/categoryModel")
const subCategory = require("../model/subCategoryModel")
const Book = require("../model/bookModel")

exports.addSubCategoryPage=async (req, res) => {
    try {
        let allCategories = await Category.find({})
        if (allCategories) {
            return res.render("subCategory/addSubCategory", { allCategories });
        } else {
            console.log("No categories found");
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.addSubCategory= async (req, res) => {
    try {
        // console.log(req.body);
        let addSubCategory = await subCategory.create(req.body)
        if (addSubCategory) {
            console.log("sub Category Added ");
            return res.redirect("/admin/viewSubCategory");
        }
        else {
            console.log("sub Category not Added ");
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.viewSubCategory=async (req, res) => {
    try {
        let SubCategories = await subCategory.find().populate("categoryId")
        // console.log(SubCategories);
        if (SubCategories) {
            return res.render("subCategory/viewSubCategory", { SubCategories });
        } else {
            console.log("No subcategories found");
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.editSubCategoryPage=async (req, res) => {
    try {
        let SubCategory = await subCategory.findById(req.params.id)
        let categories = await Category.find();
        // console.log(SubCategories);
        if (subCategory) {
            return res.render("subCategory/editSubCategory", { SubCategory, categories });
        } else {
            console.log("No subcategories found");
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.editSubCategory=async (req, res) => {
    try {
        let rec = await subCategory.findById(req.params.id)
        // console.log(editsubcategory);
        if (rec) {
            const updatedSubCategory = await subCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedSubCategory) {
                console.log("Subcategory updated successfully");
                return res.redirect("/admin/viewSubCategory");
            } else {
                console.log("Subcategory update failed");
                return res.redirect("back");
            }
        }
        return res.redirect(`/admin/editSubCategoryPage/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }
}
exports.deleteSubCategory=async (req, res) => {
    try {
        
        let rec = await subCategory.findById(req.params.id)
        console.log(rec);
        if (rec) {
            const books = await Book.find({ subCategoryId: rec._id })
            if (books.length > 0) {
                books.forEach(book => {
                    if (book.bookImage) {
                        fs.unlinkSync(path.join(__dirname, "..", book.bookImage));
                    }
                });
                await Book.deleteMany({ subCategoryId: rec._id });
            }
            let deletedsubcategory = await subCategory.findByIdAndDelete(req.params.id)
            if (deletedsubcategory) {
                console.log("sub category and books deleted success");
                return res.redirect("/admin/viewSubCategory");
            }
            else {
                console.log("sub category not deleted");
                return res.redirect("back");
            }
        }
        // return res.redirect("/admin/viewSubCategory");
    } catch (error) {
        console.log(error);
    }
}