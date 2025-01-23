const express = require('express');
const Admin = require('../model/adminModel');
const bookRoutes = express.Router();
const fs = require("fs")
const path = require("path")
const Category = require("../model/categoryModel")
const subCategory = require("../model/subCategoryModel")
const Book = require("../model/bookModel");
const { addBookPage, getsubcategories, addbook, viewbook, deleteBook, editBookPage, editBook } = require('../controller/bookController');

bookRoutes.get("/addBookPage", addBookPage)

// ==========================dependent dropdown when adding books
bookRoutes.get("/getsubcategories/:id", getsubcategories)
// 
bookRoutes.post("/addbook", Book.uploadImage, addbook)
bookRoutes.get("/viewbook", viewbook)
bookRoutes.get("/deleteBook/:id", deleteBook)
bookRoutes.get("/editBookPage/:id", editBookPage)
bookRoutes.post("/editBook/:id", Book.uploadImage, editBook)


module.exports = bookRoutes