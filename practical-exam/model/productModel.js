const mongoose= require("mongoose")
const fs= require("fs")
const multer = require("multer")
const path = require("path")

const productSchema= mongoose.Schema({
    adminid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    product:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
})

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..", "uploads/product"))
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now());
    }
})

productSchema.statics.uploadImage = multer({ storage: storage }).single('productImage');

const Product= mongoose.model("Product" ,productSchema);
module.exports= Product