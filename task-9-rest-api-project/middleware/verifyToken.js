const User = require('../models/userModels');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'].split(" ")[1];
    if(!token){
        return res.json({message: "Token required, please login hrd"});
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