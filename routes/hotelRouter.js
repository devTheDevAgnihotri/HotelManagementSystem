const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const hotel = require('../models/hotel');

const hotelRouter = express.Router();

hotelRouter.use(bodyParser.json());

hotelRouter.route('/')
.get((req,res,next) => {
    hotel.find({})
    .populate('room.Rooms_Occupied')
    .then((hotel) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hotel);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    hotel.create(req.body)
    .then((hotel) => {
        console.log('Room created ', hotel);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hotel);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /hotel');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    hotel.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


module.exports = hotelRouter;