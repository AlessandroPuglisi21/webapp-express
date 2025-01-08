function errorsHandler(err, _, res) {
    res.status(500)
    res.json({
        message: err.message
    })
}

module.exports = errorsHandler