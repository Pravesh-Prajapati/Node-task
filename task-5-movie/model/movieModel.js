const mongoose = require("mongoose")

const multer = require('multer');
const path = require('path');

const movieSchema = mongoose.Schema({
    title: {
        type: String
    },
    director: {
        type: String,
    },
    description: {
        type: String,
    },
    releaseYear: {
        type: Number,
    },
    genre: {
        type: String,
    },
    movieImage: {
        type: String,
    },
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads/movies"))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
})

movieSchema.statics.uploadImage = multer({ storage }).single('movieImage');
const Movie = mongoose.model("Movie", movieSchema)
module.exports = Movie