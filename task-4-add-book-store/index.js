const express= require("express")
const port= 8888;
const app= express()
const dbConnect= require("./config/config")

app.set("view engine","ejs")
app.use(express.urlencoded())

app.use("/books",require("./routes/bookRoutes"));

app.get("/",(req,res)=>{
    return res.render("index")
})
app.listen(port,()=>{
    console.log("server started at port" ,port);
})