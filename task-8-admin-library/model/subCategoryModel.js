const express = require("express")
const mongoose = require("mongoose")

const subCategorySchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    subCategoryName: {
        type: String,
        required: true
    }
})

const subCategory = mongoose.model("subCategory", subCategorySchema);

module.exports = subCategory;