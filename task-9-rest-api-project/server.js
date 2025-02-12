require('dotenv').config();

const express = require('express');

const port = 1044;
const db = require("./config/dbConnection");
const app = express();
const path = require('path');
const morgan = require('morgan');
// app.use(express.static(__dirname + '/public/blog'));

app.use(morgan('dev'));
app.use(express.urlencoded());

app.use("/", require("./routes/indexRoutes"));

app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}`);
});