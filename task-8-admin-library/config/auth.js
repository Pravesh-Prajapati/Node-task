const jwt = require("jsonwebtoken")
const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            return res.redirect("/");
        }
        let decoded = jwt.verify(token, "AdminSecretKey")
        req.user = decoded;
        res.locals.loginUser = decoded;
        
        next()
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.redirect("/");
    }
}
module.exports = adminAuth



