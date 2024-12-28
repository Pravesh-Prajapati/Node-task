const mongoose = require("mongoose")

const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/Blog")
        .then((res) => {
            console.log("Db connect");
        }).catch((err) => {
            console.log(err);
        })
}
module.exports=dbConnect()