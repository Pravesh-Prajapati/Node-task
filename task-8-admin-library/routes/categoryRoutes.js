const express = require("express");
const Category = require("../model/categoryModel");
const categoryRoutes = express.Router()
const fs = require("fs")
const path = require("path")
const Book = require("../model/bookModel");
const subCategory = require("../model/subCategoryModel");
const { addCategoryPage, addCategory, viewCategoryPage, deleteCategory, editCategoryPage, editCategory } = require("../controller/categoryController");

categoryRoutes.get("/addCategoryPage",addCategoryPage)
categoryRoutes.post("/addCategory", Category.uploadImage,addCategory)
categoryRoutes.get("/viewCategoryPage", viewCategoryPage)
categoryRoutes.get("/deleteCategory/:id", deleteCategory)
categoryRoutes.get("/editCategoryPage/:id", editCategoryPage)
categoryRoutes.post("/editCategory/:id", Category.uploadImage, editCategory)

module.exports = categoryRoutes