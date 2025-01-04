const express = require('express');
const path = require('path');
const port = 1010;
const db = require("./config/dbConnect");
const session = require('express-session');
const passport = require("passport");
const localSt = require("./config/passportLocalStrategy");
const app = express();

app.use(session({
    name: 'learning',
    secret: "learning",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setLocalUser)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))


app.use("/", require("./routes/authRoutes"));
app.use("/admin", require('./routes/blogRoutes'));

app.listen(port, () => {
    console.log(`Server starting at http://localhost:${port}`);
})