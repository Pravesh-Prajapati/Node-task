
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const adminSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    hobby: {
        type: Array
    },
    contactno: {
        type: String
    },
    info: {
        type: String
    },
    profileImage: {
        type: String
    },
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/admins"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});

adminSchema.statics.uploadImage = multer({storage: storage}).single('profileImage');

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
