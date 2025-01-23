
const express = require('express');
const Admin = require('../model/adminModel');
const adminRoutes = express.Router();
const fs = require("fs")
const path = require("path");
const { addAdminPage, addAdmin, viewAdminPage, deleteAdmin, editAdminPage, updateAdmin, loginAdminPage, viewProfile } = require('../controller/adminController');

adminRoutes.get("/addAdminPage", addAdminPage)
adminRoutes.post("/addAdmin", Admin.uploadImage,addAdmin)
adminRoutes.get("/viewAdminPage", viewAdminPage)
adminRoutes.get("/deleteAdmin/:id", deleteAdmin)
adminRoutes.get("/editAdminPage/:id", editAdminPage)
adminRoutes.post("/updateAdmin/:id", Admin.uploadImage, updateAdmin)
adminRoutes.post("/loginAdminPage",loginAdminPage)
adminRoutes.get("/viewProfile", viewProfile)


// ===============================category
adminRoutes.get("/addCategoryPage", require("../routes/categoryRoutes"))
adminRoutes.post("/addCategory", require("../routes/categoryRoutes"))

adminRoutes.get("/viewCategoryPage", require("../routes/categoryRoutes"))
adminRoutes.get("/deleteCategory/:id", require("../routes/categoryRoutes"))

adminRoutes.get("/editCategoryPage/:id", require("../routes/categoryRoutes"))
adminRoutes.post("/editCategory/:id", require("../routes/categoryRoutes"))

// ==========================sub category

adminRoutes.get("/addSubCategoryPage", require("../routes/subCategoryRoutes"))
adminRoutes.post("/addSubCategory", require("../routes/subCategoryRoutes"))

adminRoutes.get("/viewSubCategory", require("../routes/subCategoryRoutes"))
adminRoutes.get("/editSubCategoryPage/:id", require("../routes/subCategoryRoutes"))
adminRoutes.post("/editSubCategory/:id", require("../routes/subCategoryRoutes"))

adminRoutes.get("/deleteSubCategory/:id", require("../routes/subCategoryRoutes"))

// ============================ books===
adminRoutes.get("/addbookPage", require("../routes/bookRoutes"))
adminRoutes.post("/addbook", require("../routes/bookRoutes"))

adminRoutes.get("/viewbook", require("../routes/bookRoutes"))
adminRoutes.get("/editBookPage/:id", require("../routes/bookRoutes"))
adminRoutes.post("/editBook/:id", require("../routes/bookRoutes"))

adminRoutes.get("/deleteBook/:id", require("../routes/bookRoutes"))

// ==========================dependent dropdown when adding and updating books 
adminRoutes.get("/getsubcategories/:id", require("../routes/bookRoutes"))

module.exports = adminRoutes;
