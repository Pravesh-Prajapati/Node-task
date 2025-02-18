const express= require("express")
const port= 6000;
const app= express()
const db= require("./config/dbConnect")
app.use(express.urlencoded());
app.use(express.json());

app.use("/" ,require("./routes/adminRoutes"))
app.use("/user" ,require("./routes/userRoutes"))

app.listen(port,()=>{
    console.log(`Server start at http://localhost:${port}`);
})