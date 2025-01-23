const express = require('express');
const Admin = require('../model/adminModel');
const subCategoryRoutes = express.Router();
const fs = require("fs")
const path = require("path")
const Category = require("../model/categoryModel")
const subCategory = require("../model/subCategoryModel")
const Book = require("../model/bookModel");
const { addSubCategoryPage, addSubCategory, viewSubCategory, editSubCategoryPage, editSubCategory, deleteSubCategory } = require('../controller/subCategoryController');

subCategoryRoutes.get("/addSubCategoryPage", addSubCategoryPage)

subCategoryRoutes.post("/addSubCategory",addSubCategory)
subCategoryRoutes.get("/viewSubCategory", viewSubCategory)
subCategoryRoutes.get("/editSubCategoryPage/:id", editSubCategoryPage)
subCategoryRoutes.post("/editSubCategory/:id", editSubCategory)
subCategoryRoutes.get("/deleteSubCategory/:id", deleteSubCategory)

module.exports = subCategoryRoutes