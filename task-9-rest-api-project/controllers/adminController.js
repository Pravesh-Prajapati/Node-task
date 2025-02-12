const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Blog = require("../models/blogModels");
const fs = require('fs');
const path = require('path');

exports.registerAdmin = async (req, res) => {
    try {
        let admin = await User.findOne({ email: req.body.email })
        if (admin) {
            return res.json({ message: "Admin already Registered !, Please login" })
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);
        req.body.role='Admin'
        admin = await User.create({ ...req.body, password: hashPass });
        return res.json({ message: "Admin Register success!!!", admin });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        let admin = await User.findOne({ email: req.body.email });
        if (!admin) {
            return res.json({ message: "Admin not Found" });
        } else {
            let checkPass = await bcrypt.compare(req.body.password, admin.password);
            if (checkPass) {
                let token = jwt.sign({
                    userId: admin._id
                }, "pravesh");
                return res.json({ message: "Login Success", token })
            } else {
                return res.json({ message: 'Password is not matched...' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};
exports.adminProfile = async (req, res) => {
    try {
        return res.json({ message: "Admin Profile Found", Admin: req.user })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};
exports.updateAdmin = async (req, res) => {
    try {
        let admin = await User.findById(req.params.id);
        if (!admin) {
            return res.json({ message: "Admin not Found!!!" });
        }
        if (req.body.password) {
            const hashPass = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashPass;
        }
        admin = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({ message: " Admin Updated Success", updatedAdmin: admin });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};
exports.addBlog = async (req, res) => {
    try {
        let admin = req.user;
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/blog/${req.file.filename}`;
            req.body.blogImage = imagePath; 
        }
        req.body.postBy = admin.username;
        req.body.adminid = admin._id;         

        const blogAdd = await Blog.create(req.body);
        if (blogAdd) {
            console.log("Blog added successfully");
            return res.json({ msg: "Blog added successfully", blogAdd });
        }
    } catch (error) {
        console.error(error);
        return res.json({ msg: "Something went wrong", error: error.message });
    }
};
exports.getAllBlog = async (req, res) => {
    try {
        const blog = await Blog.find({});
        if (blog.length > 0) {
            return res.json({ message: "All Blogs ." ,blog});
        } else {
            return res.json({ message: "No Blog found." });
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};
exports.singleBlog=async(req,res)=>{
    try {
        let singleBlog = await Blog.findById(req.params.id);
        if (!singleBlog) {
            return res.status(404).json({ message: "SingleBlog not Found!!!" });
        }
        if (singleBlog) {
            return res.json({ message: "singleBlog", singleBlog: singleBlog });
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        let admin = req.user;
        if (admin.role !== "Admin") {
            return res.json({ message: "You are not authorized to delete a blog!" });
        }
        const blogId = req.params.id;
        const blogPost = await Blog.findById(blogId);

        if (!blogPost) {
            return res.json({ message: "Blog not found!" });
        }
        const imagePath = path.join(__dirname, "..", blogPost.blogImage); 
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });

        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        console.log("Blog deleted successfully");
        return res.json({ msg: "Blog deleted successfully", deletedBlog });
    } catch (error) {
        console.error(error);
        return res.json({ msg: "Something went wrong", error: error.message });
    }
    // console.log(req.params.id);
    // return res.json({ message: "delete page" });
};
exports.updateBlog = async (req, res) => {
    try {
        let admin = req.user;
       if (admin.role !== "Admin") {
        return res.json({ message: "You are not authorized to update a blog!" });
       }
        let record = await Blog.findById(req.params.id);
        if (!record) {
            return res.json({ message: "Blog not found" });
        }

        if (req.file) {
            let imagePath = record.blogImg;
            if (imagePath) {
                imagePath = path.join(__dirname, "..", imagePath);
                try {
                    await fs.unlinkSync(imagePath);
                } catch (error) {
                    console.log("File Missing or Error Deleting:", error);
                }
            }

            let newImagePath = `/uploads/blog/${req.file.filename}`;
            req.body.blogImg = newImagePath; 
        } else {
            req.body.blogImg = record.blogImg;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Update Record Success...");
        return res.json({ message: "Blog updated successfully", updatedBlog });
       
    } catch (error) {
        console.error(error);
        return res.json({ message: "Something went wrong", error: error.message });
    }
};