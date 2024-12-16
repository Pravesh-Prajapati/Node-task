const express= require("express")
const path = require('path');
const port=8000;
const app= express()
const db= require("./config/dbConnect")

app.use(express.urlencoded())
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))
app.set("view engine" , "ejs")

app.get("/",(req,res)=>{
   return res.render("index")
})

// app.use("/form",require("./routes/formRoutes"))
app.use("/movie",require("./routes/movieRoutes"));

app.listen(port,(err)=>{
    console.log("started at port " ,port);
})