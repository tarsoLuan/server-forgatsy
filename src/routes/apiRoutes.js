const express = require('express')
const router = express.Router()
const path = require('path')

const bookController = require('../controllers/bookController')
const userController = require('../controllers/userController')
const reviewController = require('../controllers/reviewController')

router.get('/book', bookController.getBooks)
router.post('/book/create', bookController.addBook)
router.post('/user', userController.getUser)
router.post('/user/create', userController.addUser)
router.get('/review', reviewController.getReview)
router.post('/review/create', reviewController.addReview)
router.get('/review/last', reviewController.getLastReviews)
router.get('/review/lastNotNull', reviewController.getLastNotNullReview)

module.exports = router