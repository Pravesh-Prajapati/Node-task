const mongoose= require("mongoose")
const multer= require("multer")
const path= require("path")
const blogSchema= mongoose.Schema({
    title:String,
    description:String,
    category:String,
    content:String,
    author:String,
    coverImage:String,
    authorEmail:String
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/blogs"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now());
    }
});
blogSchema.statics.uploadImage = multer({storage: storage}).single('coverImage');

const Blog= mongoose.model("Blog" ,blogSchema)
module.exports=Blog