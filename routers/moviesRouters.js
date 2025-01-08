const express = require('express')
const router = express.Router()
const moviesControllers = require('../controllers/moviesControllers')

//! INDEX

router.get('/', moviesControllers.index)

//! SHOW

router.get('/:id', moviesControllers.show)

module.exports = router