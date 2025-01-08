const connection = require("../data/db")

function index (req, res) {

    const sql = `SELECT * FROM movies_db.movies;`

    connection.query(sql, (err,movies) => {
        if(err) return res.status(500).json({message: err.message})

            res.json(movies)
    })
}

function show (req, res) {

    const id = req.params.id

    const sql = `SELECT * FROM movies WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        if(err) return res.status(500).json({ message: err.message })
            if(results.length === 0 )
                return res.status (404).json({
                    error: 'Not Found',
                    message: 'Movies Not Found :('
            })

            const book = results [0]

            const sql = `SELECT * FROM reviews WHERE movie_id = ?`

            connection.query(sql, [id], (err, results) => {
                if (err) return res.status(500).json({ message: err.message })

                    book.reviews = results
                    res.json(book)
            })
        })

}

module.exports = { index, show}