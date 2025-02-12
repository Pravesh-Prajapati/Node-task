const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const blogSchema = mongoose.Schema({
    adminid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment' 
    },
    postBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    blogImage: {
        type: String,
        required: true
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/blog"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

blogSchema.statics.uploadImageBlog = multer({ storage: storage }).single('blogImage');

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;