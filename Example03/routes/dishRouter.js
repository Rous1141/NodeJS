const express = require('express')
const bodyParser = require('body-parser')
const dishRouter = express.Router()

//using body-parser
dishRouter.use(bodyParser.json())
//using express router to route to 'dishes'
dishRouter.route('/')
    .all((req,res,next)=>{
    res.statusCode = 200;
    console.log('Request received to /dishes')
    res.setHeader('Content-Type', 'text/plain')
    next()
})
    .get((req,res,next)=>{
    res.end('Will send all dishes to you!')
})
    .post((req,res,next)=>{
    res.end(`Will update the dish you want: ${req.body.name} with the description: ${req.body.description}`)
})
    .put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /dishes')
})
    .delete((req,res,next)=>{
    res.end('Deleting the dishes')
})
//end route
// Create another route to perform on each specific 'dish'
dishRouter.route('/:dishId')
    .all((req,res,next)=>{
        console.log(`Request received to /dishes/${req.params.dishId}`)
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req,res,next)=>{
    res.end(`Getting the dish with the dish ID: ${req.params.dishId}`)
})
    .post((req,res,next)=>{
    res.statusCode=403;
    res.end(`POST operation not supported on /dishes/${req.params.dishId}`)
})

    .put((req,res,next)=>{
    res.write(`Updating the dish with ID: ${req.params.dishId}\n`)
    res.end(`To name: ${req.body.name} with description: ${req.body.description}`)
})

    .delete((req,res,next)=>{
    res.end(`Delete the dish with the ID: ${req.params.dishId}`)
})
//end route

module.exports = dishRouter