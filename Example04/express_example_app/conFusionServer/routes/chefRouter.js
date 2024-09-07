const express = require('express')
const bodyPaser = require('body-parser')
const chefRouter = express.Router()

chefRouter.use(bodyPaser.json())

chefRouter.route('/')
    .all((req,res,next)=>{
        res.statusCode = 200;
        console.log('Request received to /chefs')
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req,res)=>{
        res.end("Sending you all available chefs")
    })
    .put((req,res)=>{
        res.statusCode = 403;
        res.end("Operation 'PUT' not allowed on /chefs")
    })
    .post((req,res)=>{
        res.end(`Will update (create) a new chef with name: ${req.body.name} - specialty: ${req.body.specialty}`)
    })
    .delete((req,res)=>{
        res.end("Killing all chef...")
    })

chefRouter.route('/:chefId')
    .all((req,res,next)=>{
        res.statusCode = 200;
        console.log(`Request received to /chefs/${req.params.chefId}`)
        res.setHeader('Content-Type', 'text/plain')
        next()
    })
    .get((req,res)=>{
        res.end(`Sending you info of chef: ${req.params.chefId}`)
    })
    .put((req,res)=>{
        res.end(`Updating chef with ID: ${req.params.chefId} to \nName: ${req.body.name} - Specialty: ${req.body.specialty}`)
    })
    .post((req,res)=>{
        res.statusCode = 403;
        res.end(`Operation 'POST' not allowed on /chef/${req.params.chefId}`)
    })
    .delete((req,res)=>{
        res.end("Killing the chef...")
    })

module.exports = chefRouter