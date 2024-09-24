const express = require('express')
const bodyParser = require('body-parser')
const dishRouter = express.Router()
const mongoose = require('mongoose')

//using body-parser
dishRouter.use(bodyParser.json())

//Connect the route to Mongoose Schema
const Dishes = require("../models/dishes")
//using express router to route to 'dishes'
dishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200
                res.json(dishes)
            }, (err) =>
                next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log('Dish Created! ', dish)
                res.statusCode = 200
                res.json(dish)
            }, (err) =>
                next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes')
    })
    .delete((req, res, next) => {
        Dishes.deleteMany({})
            .then((respone) => {
                console.log('All dishes deleted!')
                res.statusCode = 200
                res.json(respone)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
//end route
// Create another route to perform on each specific 'dish'
dishRouter.route('/:dishId')
    .all((req, res, next) => {
        console.log(`Request received to /dishes/${req.params.dishId}`)
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                res.statusCode = 200
                res.json(dish)
            }, (err) => next(err))
            .catch((err) => next(err))
        //res.end(`Getting the dish with the dish ID: ${req.params.dishId}`)
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /dishes/${req.params.dishId}`)
    })

    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, req.body,
            { new: true })
            .then((dish) => {
                res.statusCode = 200
                res.json(dish)
            }, (err) => next(err))
            .catch((err) => next(err))
        // res.write(`Updating the dish with ID: ${req.params.dishId}\n`)
        // res.end(`To name: ${req.body.name} with description: ${req.body.description}`)
    })

    .delete((req, res, next) => {
        Dishes.findByIdAndDelete(req.params.dishId)
        .then(() => {
                res.statusCode = 200
            }, (err) => next(err))
        // res.end(`Delete the dish with the ID: ${req.params.dishId}`)
    })
//end route

module.exports = dishRouter