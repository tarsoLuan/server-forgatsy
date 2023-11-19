const Book = require('../models/book');
const Review = require('../models/review');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const getReview = async(req,res) => {
    try {
        const userId = req.params.userId
        const bookId = req.params.bookId
        const review = await Review.findOne({where : {userId : userId, bookId : bookId}})
        res.json(review)
    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

const addReview = async(req,res) => {
    try {
        const { userId, bookId, rating, review } = req.body
        const newReview = await Review.create({
            userId,
            bookId,
            rating,
            review
        })
        res.json(newReview)
    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

const getLastReviews = async(req,res) => {
    try {
        console.log('req.query -> ' + JSON.stringify(req.query));
        const { id, limit } = req.query
        const lastReviews = await Review.findAll({
            where : {userId : id},
            limit : parseInt(limit),
            order : [['createdAt', 'DESC']],
            include: [{
                model: Book
            }]
        })
        res.json(lastReviews)
    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

const getLastNotNullReview = async(req,res) => {
    try {
        const { id, limit } = req.query
        const lastReviews = await Review.findAll({
            where : {userId : id, review : {[op.ne] : null}},
            limit : parseInt(limit),
            order : [['createdAt', 'DESC']],
            include: [{
                model: Book
            }]
        })
        res.json(lastReviews)

    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

module.exports = {getReview, getLastReviews, getLastNotNullReview, addReview}