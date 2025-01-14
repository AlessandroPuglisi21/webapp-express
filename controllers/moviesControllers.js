const connection = require("../data/db");

function index(req, res) {
    const searchTerm = req.query.search || '';
    const sql = `SELECT * FROM movies_db.movies WHERE title LIKE ?`;

    connection.query(sql, [`%${searchTerm}%`], (err, movies) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json(movies.map(movie => {
            return {
                ...movie,
                image: 'http://localhost:3000' + movie.image
            };
        }));
    });
}

function show(req, res) {
    const id = req.params.id;
    const sql = `SELECT * FROM movies_db.movies WHERE id = ?`;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0)
            return res.status(404).json({ error: 'Not Found', message: 'Movie Not Found :(' });

        const movie = results[0];
        const sqlReviews = `SELECT * FROM movies_db.reviews WHERE movie_id = ?`;

        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ message: err.message });

            movie.reviews = reviews;
            res.json(movie);
        });
    });
}

function movieReview(req, res) {
    const id = req.params.id;
    const { text, vote, name } = req.body;
    const intVote = parseInt(vote);

    if (!intVote || isNaN(intVote) || !name) {
        return res.status(400).json({ error: 'Missing data' });
    }

    const sql = `INSERT INTO movies_db.reviews (text, vote, name, movie_id) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [text, intVote, name, id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        res.status(201).json({ message: 'Review added' });
    });
}

module.exports = { index, show, movieReview };
