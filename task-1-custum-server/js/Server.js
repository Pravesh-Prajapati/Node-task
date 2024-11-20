let http = require('http')
let port = 2222;
let fs= require('fs')

let requestHandler = (req, res) => {
    let path = ""
    switch (req.url) {
        case "/":
            // path = "./index.html"
            path = "../index.html"
            break;
        case "/about":
            path = "../about.html"
            break;
        case "/contact":
            path = "../contact.html"
            break;
        case "/product":
            path = "../product.html"
            break;  
        default:
            path = "../error.html"
            break;
    }
    let result = fs.readFileSync(path);
    res.end(result)
}
let server = http.createServer(requestHandler);
server.listen(port, (err) => {
    if (err) {
        console.log(`Server not started: ${err}`);
        return false
    }
    else {
        console.log(`Server started at http://localhost:${port}`);
    }
})