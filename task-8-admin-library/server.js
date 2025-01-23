const express = require('express');
const path = require('path');
const port = 9000;
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const userAuth = require("./config/auth")

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

app.use("/admin", userAuth, require("./routes/adminRoutes"));
app.use("/", require('./routes/authRoutes'));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`);
})