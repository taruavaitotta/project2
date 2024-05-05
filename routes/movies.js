// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new movie
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a movie by ID
router.patch('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        
        if (req.body.name != null) {
            movie.name = req.body.name;
        }
        if (req.body.description != null) {
            movie.description = req.body.description;
        }
        if (req.body.price != null) {
            movie.price = req.body.price;
        }

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        await movie.remove();
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

