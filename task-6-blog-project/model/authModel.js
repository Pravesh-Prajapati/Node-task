const mongoose= require("mongoose")
const multer= require("multer")
const path= require("path")
const userSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    gender:String,
    hobbies:Array,
    contact:Number,
    profileImage:String
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/users"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});
userSchema.statics.uploadImage = multer({storage: storage}).single('profileImage');

const User= mongoose.model("User" ,userSchema)
module.exports=User