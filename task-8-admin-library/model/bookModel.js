const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');

const bookSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: true
    },
    bookImage: {
        type: String,
        required: true
    },
    bookPages: {
        type: Number,
        required: true
    },
    bookPrice: {
        type: Number,
        required: true
    },
    bookPublisher: {
        type: String,
        required: true
    },
    publisherEmail: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookPublishedDate: {
        type: Date,
        required: true
    },
    bookLanguage: {
        type: Array,
        required: true
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/books"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});

bookSchema.statics.uploadImage = multer({storage: storage}).single('bookImage');

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
