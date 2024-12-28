const Blog = require("../model/blogModel")
const User = require("../model/authModel")
const path= require("path")
const fs= require("fs")

exports.addBlogPage=(req, res) => {
    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            return res.redirect("/signInPage")
        }
        else {
            return res.render("addBlog")
        }
    } catch (error) {
        console.log(error);
        res.redirect("/admin/addBlogPage")
    }
}
exports.addBlog=async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);
        let imagePath = ""
        if (req.file) {
            imagePath = `/uploads/blogs/${req.file.filename}`
        }
        let fullName = req.cookies.loginUser.firstName + " " + req.cookies.loginUser.lastName
        req.body.author = fullName
        req.body.authorEmail = req.cookies.loginUser.email
        req.body.coverImage = imagePath

        // console.log(req.body);
        let addedBlog = await Blog.create(req.body)
        if (addedBlog) {
            console.log("Blog Added Sucessfully...");
            return res.redirect("/home")
        }
        else {
            console.log("Blog Didnt Added");
            return res.redirect("/admin/addBlogPage")
        }

    } catch (error) {
        console.log(error);
        return res.redirect("/admin/addBlogPage")
    }
}
exports.singleBlog=async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        // console.log(blog);
        return res.render("singleBlog", { blog })
    } catch (error) {
        console.log(error);
    }
}
exports.profilePage=async (req, res) => {
    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            console.log("You are not logged in");
            return res.redirect("/signInPage")
        }
        else {
            const user = req.cookies.loginUser
            const loginUserEmail = req.cookies.loginUser.email
            // console.log(user);
            const loginAdminPost = await Blog.find({ authorEmail: loginUserEmail })
            // console.log(loginAdminPost);
            return res.render("profile", { user, loginAdminPost })
        }
    } catch (error) {
        console.log(error);
    }
}
exports.deleteBlog=async (req, res) => {
    try {
        let post = await Blog.findById(req.params.id)
        if (post) {
            try {
                let imagepath = path.join(__dirname, "..", post.coverImage)
                fs.unlinkSync(imagepath);
                await Blog.findByIdAndDelete(req.params.id)
                console.log("Blog Deleted Success...");
                return res.redirect("/admin/profilePage")
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("Something Went wrong");
            return res.redirect("/admin/profilePage")
        }
    } catch (error) {
        console.log(error);
    }
}
exports.editBlogPage=async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id)
        return res.render("editBlog", { blog })
    } catch (error) {
        console.log(error);
    }
}
exports.editBlog= async (req, res) => {
    // try {
    //     console.log(req.body);
    //     console.log(req.file);
    //     return res.redirect(`/admin/editBlogPage/${req.params.id}`)
    // } catch (error) {
    //     console.log(error);
    // }
    try {
        let record = await Blog.findById(req.params.id);
        console.log(record);
        if (record) {
            if (req.file) {
                let imagePath = record.coverImage;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        await fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Missing....");
                    }
                }
                let newImagepath = `/uploads/blogs/${req.file.filename}`;
                req.body.coverImage = newImagepath
            } else {
                req.body.coverImage = record.coverImage
            }
            await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Blog Updated...");
            return res.redirect("/home")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

exports.changePasswordPage=(req, res) => {
    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            return res.redirect("/signInPage")
        }
        else {
            return res.render("changePassword")
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/back")
    }
}
exports.changePassword=async (req, res) => {
    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            return res.redirect("/signInPage")
        }
        else {
            // console.log(req.body);
            let loginAdminPass = req.cookies.loginUser
            // console.log(loginAdminPass);
            if (loginAdminPass.password == req.body.oldPassword && req.body.newPassword == req.body.confirmPassword && loginAdminPass.password != req.body.newPassword) {
                const user = await User.findById(loginAdminPass._id)
                // console.log(user);
                user.password = req.body.newPassword
                await user.save()
                console.log("Changed password");
                res.clearCookie("loginUser");
                return res.redirect("/signInPage")
            }
            else {
                console.log("password didnt changed");
                return res.redirect("/admin/changePasswordPage")
            }
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/admin/changePasswordPage")
    }
}

exports.editProfilePage=async(req,res)=>{
    try {
        if (req.cookies.loginUser == undefined || req.cookies.loginUser._id == undefined) {
            return res.redirect("/signInPage")
        }
        else{
            let user= req.cookies.loginUser
            return res.render("editProfile",{user})
        }
        // console.log(user);
    } catch (error) {
        console.log(error);
    }
}
exports.editProfile=async(req,res)=>{
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            console.error("User not found");
            return res.redirect("/home");
        }

        let newImagePath = user.profileImage;
        if (req.file && req.file !== undefined) {
            newImagePath = `/uploads/users/${req.file.filename}`;
            try {
                fs.unlinkSync(path.join(__dirname, "..", user.profileImage));
            } catch (err) {
                console.error("Error removing old image:", err);
            }
        }

        user.profileImage = newImagePath;
        await user.save();

        res.cookie('loginUser', {
            ...req.cookies.loginUser,
            profileImage: user.profileImage,
        },);
        console.log("Profile image updated successfully!");

        return res.redirect("/admin/profilePage");
    } catch (error) {
        console.error("Error updating profile image:", error);
        return res.redirect("/admin/profilePage")
    }

}