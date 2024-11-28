const express= require("express")
const port= 5555;
const app= express()
app.set("view engine", "ejs");
app.use(express.urlencoded());

let alltask=[
    {
        task:"Eat"
    },
    {
        task:"Sleep"
    },
    {
        task:"Code"
    }
]
let completedtask=[
    {
        task:"Gym"
    },
    {
        task:"Run"
    }
]

// ===========================================read
app.get("/",(req,res)=>{
    res.render("Home",{alltask:alltask,completedtask:completedtask})
})
// ===========================================create
app.post("/addtask",(req,res)=>{
    // console.log(req.body);
    let {task}= req.body
    let newtask= {
        task
    }
    alltask.push(newtask)
    res.redirect("/")
})
// ==========================================delete
app.get("/delete/:id",(req,res)=>{
    // console.log(req.params.id);
    let index= req.params.id
    alltask= alltask.filter((val,i)=>{
        return i!=index
    })
    res.redirect("/")
})
// ================================================complete
app.get("/complete/:id",(req,res)=>{
    let index= req.params.id
    result = alltask.filter((val,i)=>{
        return i==index
    })
    alltask= alltask.filter((val,i)=>{
        return i!=index
    })
    completedtask.push(result[0])
    res.redirect("/")
})
// =================================================incomplete
app.get("/incomplete/:id",(req,res)=>{
    let index= req.params.id
    // console.log(index);
    result= completedtask.filter((val,i)=>{
        return i==index
    })
    completedtask= completedtask.filter((val,i)=>{
        return i!=index
    })
    // console.log(result[0]);
    alltask.push(result[0])
    res.redirect("/")
})
// ================================================listen

app.listen(port,(err)=>{
    if (err) {
       console.log("errror");
    }
    else{
        console.log("started at port" ,port);
    }
})