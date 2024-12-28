const express = require('express');
const path = require('path');
const port = 8888;
const db = require("./config/dbConnect");
const cookieParser = require('cookie-parser');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))


app.use("/", require("./routes/authRoutes"));
app.use("/admin", require('./routes/blogRoutes'));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`);
})