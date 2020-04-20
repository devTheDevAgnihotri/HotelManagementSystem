const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');


const book = require('../models/booking');

const bookingRouter = express.Router();

bookingRouter.use(bodyParser.json());

bookingRouter.route('/')
.get((req,res,next) => {
    book.find({})
    .then((book) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    book.create(req.body)
    .then((book) => {
        console.log('booking  Confirmed', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /book');
})
.delete(authenticate.verifyAdmin,authenticate.verifyUser,(req, res, next) => {
    book.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


bookingRouter.route('/:bookId')
.get((req,res,next) => {
    book.findById(req.params.bookId)
    .then((book) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /book/'+ req.params.bookId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.bookId, {
        $set: req.body
    }, { new: true })
    .then((book) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Dishes.findByIdAndRemove(req.params.bookId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports =bookingRouter;