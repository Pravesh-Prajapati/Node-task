const express = require('express');
const port = 7777;
const path = require('path');
const app = express();

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// ==================================about middleware
const islogin = (req, res, next) =>{
    if(req.query.userlogin =="true"){
        next();
    }else{
        return res.redirect('/');
    }
}   
// =================================contact middleware
const validate = (req, res, next) =>{
    if(req.query.role =="admin"){
        next();
    }else{
        return res.redirect('/');
    }
}

app.get('/', (req, res)=>{
    return res.render('home');
})
app.get('/about',islogin,(req, res)=>{
    return res.render('about');
})

app.get('/contact',validate,(req, res)=>{
    return res.render('contact');
})

app.listen(port, ()=>{
    console.log(`Server start at http://localhost:${port}`);
})