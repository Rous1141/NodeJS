const express = require('express')
const bodyParser = require('body-parser')
const dishRouter = express.Router()

//using body-parser
dishRouter.use(bodyParser.json())
//using express router
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
// //Below is not finished, do not touch
//     .get('/dishes/:dishId',(req,res,next)=>{
//     res.end(`Getting the dish with the dish ID: ${req.params.dishId}`)
// })
//     .post('/dishes/:dishId',(req,res,next)=>{
//     res.statusCode=403;
//     res.end(`POST operation not supported on /dishes/${req.params.dishId}`)
// })

//     .put('/dishes/:dishId',(req,res,next)=>{
//     res.write(`Updating the dish with ID: ${req.params.dishId}\n`)
//     res.end(`To name: ${req.body.name} with description: ${req.body.description}`)
// })

//     .delete('/dishes/:dishId',(req,res,next)=>{
//     res.end(`Delete the dish with the ID: ${req.params.dishId}`)
// })
//Underconstruction above

module.exports = dishRouter