const Movie = require('../model/movieModel');
// const movieSchema = require("../model/movieModel");
const path = require('path');
const fs = require('fs');

exports.moviePage = async (req, res) => {
    try {
        let allMovie = await Movie.find()
        // console.log(allMovie);
        return res.render("movie", { allMovie })
    } catch (error) {
        console.log("Movie not loaded");
        return res.render("movie")
    }
}

exports.form = async (req, res) => {
    return res.render("form")
}

exports.addMovie = async (req, res) => {
    // async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/movies/${req.file.filename}`
        }
        req.body.movieImage = imagePath;
        let newMovie = await Movie.create(req.body);
        if (newMovie) {
            console.log('Movie Added');
            return res.redirect('/movie');
        } else {
            console.log("Somthing Wrong");
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
    // }
}

exports.deleteMovie = async (req, res) => {
    try {
        let rec = await Movie.findById(req.params.id);
        console.log(rec);
        res.redirect('/movie');
        if (rec) {
            if (rec.movieImage) {
                let imagepath = path.join(__dirname, "..", rec.movieImage)
                await Movie.findByIdAndDelete(req.params.id);
                await fs.unlinkSync(imagepath);
                return res.redirect('/movie');
            }
            else {
                await Movie.findByIdAndDelete(req.params.id);
                console.log("Delete Success");
                return res.redirect('/movie');
            }
        }
        else {
            console.log('Somthing Wrong');
            return res.redirect('/movie');
        }

        // if (rec) {
        //     let imagepath = path.join(__dirname, "..", rec.movieImage)
        //     await fs.unlinkSync(imagepath);
        //     await Movie.findByIdAndDelete(req.params.id);
        //     console.log("Delete Success");
        //     return res.redirect('/movie');
        // } else {
        //     console.log('Somthing Wrong');
        //     return res.redirect('/movie');
        // }
    } catch (error) {
        console.log("something Went Wrong", error);
    }
}


exports.editMovie = async (req, res) => {
    let movie = await Movie.findById(req.params.id);
    // console.log(movie);
    if (movie) {
        return res.render('editMovie', { movie })
    }
    else {
        return res.redirect("/");
    }
}

exports.updateMovie = async (req, res) => {
    let rec = await Movie.findById(req.params.id);
    if (rec) {
        if (req.file) {
            let imagepath = path.join(__dirname, "..", rec.movieImage)
            await fs.unlinkSync(imagepath);
            imagepath = `/uploads/movies/${req.file.filename}`
            req.body.movieImage = imagepath;
        }
        await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Update Success');
        return res.redirect("/movie");
    }
}

exports.singleMovie = async (req, res) => {
    try {
        let singleMovie = await Movie.findById(req.params.id)
        // console.log(singleMovie);
        return res.render('singleMovie', { singleMovie });
    } catch (error) {
        console.log(error);
        return res.render('singleMovie');
    }
}

