const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Blog = require("../models/blogModels");
const fs = require('fs');
const path = require('path');
const User = require("../models/userModels");
const Comment = require('../models/commentModels');


exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.json({ message: "User already Registered!!!!, Login Now" })
        }
        const harshPass = await bcrypt.hash(req.body.password, 10);
        admin = await User.create({ ...req.body, password: harshPass });
        return res.json({ message: "User Register success!!!" ,admin});
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        } else {
            let checkPasshrd = await bcrypt.compare(req.body.password, user.password);
            if (checkPasshrd) {
                let token = jwt.sign({
                    userId: user._id
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

exports.createComment = async (req, res) => {
    req.body.role = 'Users'
    const comment = new Comment({
        comments: req.body.comments,
        role: 'Users'
    });

    await comment.save();
    const populatedComment = await Comment.findById(comment._id)
        .populate('userid', 'username email')
        .populate('blogid', 'title description');
    res.status(201).json({ message: "Comment posted successfully", comment: populatedComment });
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blog = await Blog.find({});
        if (blog.length > 0) {
            return res.json({ message: "All Blogs .", blog });
        } else {
            return res.json({ message: "No Blog found." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
exports.singleBlog = async (req, res) => {
    try {
        let singleBlog = await Blog.findById(req.params.id).populate('comments');
        if (!singleBlog) {
            return res.status(404).json({ message: "SingleBlog not Found!!!" });
        }

        let comments = await Comment.find({})
        if (comments) {
            // console.log(comments,"hrd");
            return res.status(200).json({ message: "Single Blog retrieved successfully", singleBlog, comments });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }

};
exports.deleteUser = async (req, res) => {
        const user = req.user;
        const userIdToDelete = req.params.id;
        if (user.role == "Users") {
            return res.status(403).json({ message: "You are not authorized to delete a user!" });
        }
        const userToDelete = await User.findById(userIdToDelete);
        if (!userToDelete) {
            return res.status(404).json({ message: "User  not found!" });
        }

        let userDelete = await User.findByIdAndDelete(userIdToDelete);

        res.status(200).json({ message: "User  deleted successfully!", userDelete });
};
exports.updateUser = async (req, res) => {
        const users = req.user;
        if (users.role == "Users") {
            return res.status(403).json({ message: "You are not authorized to add a Update!" });
        }
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not Found!!!" });
        }
        if (req.body.password) {
            const hashPass = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashPass;
        }
        admin = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(202).json({ message: "Update User Success", data: user });
    
};
exports.userProfile = async (req, res) => {
    try {
        return res.json({ message: "User Profile Found", User: req.user })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};
exports.deleteComment = async (req, res) => {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found!" });
        }
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted successfully!", comment });
};