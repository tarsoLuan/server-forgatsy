const Book = require('../models/book');
const Sequelize = require('sequelize');
const op = Sequelize.Op;


const getBooks = async(req,res) => {
    try {
        const { name, limit } = req.query
        const book = await Book.findAll({where : 
            { name : {[op.like] : '%'+name+'%'}},
            limit : parseInt(limit)
        })
        res.json(book)
    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

const addBook = async(req,res) => {
    try {
        const { name, author, description, imageBlob } = req.body
        const checkBook = await Book.findOne({where : {name : name}})

        if(checkBook) {
            res.json('Book already exists')
            return
        }
        

        const book = await Book.create({ name, author, description, imageBlob })
        res.json('Book added')
    } catch (e) {
        console.error(e)
        res.status(500).send('Server error')
    }
}

module.exports = {getBooks, addBook}