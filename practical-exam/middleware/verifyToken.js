const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'].split(" ")[1];
    if(!token){
        return res.json({message: "Token required, please login first"});
    }
    let {userId} = jwt.verify(token, "pravesh");
    let user = await User.findById(userId);
    if(user){
        req.user = user;
        next();
    }else{
        return res.json({message: "User not found"});
    }
}