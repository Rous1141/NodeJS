const express = require('express')
const bodyParser = require('body-parser')
const categoryRouter = express.Router()
const mongoose = require('mongoose')

//using body-parser
categoryRouter.use(bodyParser.json())

//Connect the route to Mongoose Schema
const Category = require("../models/category")

categoryRouter.route('/') // route at http://.../category
    .get((req, res, next) => {
        Category.find({})
            .then((category) => {
                res.statusCode = 200
                res.json(category)
            }, (err) =>
                next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Category.create(req.body)
            .then((category) => {
                console.log('Category Created! ',+category)
                res.statusCode = 200
                res.json(category)
            }, (err) =>
                next(err))
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /category')
    })
    .delete((req, res, next) => {
        Category.del({})
            .then((respone) => {
                console.log('All categories deleted!')
                res.statusCode = 200
                res.json(respone)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
//end route
// Create another route to perform on each specific 'category' route at http://.../category/:id
categoryRouter.route('/:categoryId')
    // .all((req, res, next) => {
    //     console.log(`Request received to /dishes/${req.params.dishId}`)
    //     res.setHeader('Content-Type', 'text/plain')
    //     next()
    // }) -- ERROR -- Don't uncomment
    .get((req, res, next) => {
        Category.findById(req.params.categoryId)
            .then((category) => {
                res.statusCode = 200
                console.log("Found the category: ",+category.categoryName)
                res.json(category)
            }, (err) => next(err))
            .catch((err) => next(err))
        //res.end(`Getting the dish with the dish ID: ${req.params.categoryId}`)
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /dishes/${req.params.categoryId}`)
    })

    .put((req, res, next) => {
        Category.findByIdAndUpdate(req.params.categoryId, req.body,
            { new: true })
            .then((category) => {
                res.statusCode = 200
                console.log("Updated the category: ",+category)
                res.json(categoryId)
            }, (err) => next(err))
            .catch((err) => next(err))
        // res.write(`Updating the dish with ID: ${req.params.categoryId}\n`)
        // res.end(`To name: ${req.body.name} with description: ${req.body.description}`)
    })

    .delete((req, res, next) => {
        Category.findByIdAndRemove(req.params.categoryId)
        .then(() => {
                res.statusCode = 200
                console.log(`Removed the category with the ID: ${req.params.categoryId}`)
            }, (err) => next(err))
        // res.end(`Delete the dish with the ID: ${req.params.categoryId}`)
    })
//end route
// Sub-route to CRUD products inside a category. At route http://.../category/:id/products
categoryRouter.route(`/:categoryId/products`)
.get((req,res,next)=>{
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null){
            console.log('Products Found with this Category ID',+req.params.categoryId)
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json")
            res.json(category.products)
        }else{
            console.log('Category Not Found with this ID',+req.params.categoryId)
            res.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})

.post((req,res,next)=>{
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null){
            category.products.push(req.body)
            category.save()
            .then((category)=>{
                console.log('Product Create In Category with this ID',+req.params.categoryId)
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json")
                res.json(category)
            })
        }else{
            console.log('Category Not Found with this ID',+req.params.categoryId)
            res.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on http://.../category/:id/products')
})
.delete((req,res,next)=>{
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null){
            for(var i = (category.products.lenght-1); i>=0; i--)
            {
                category.products.id(category.products[i]._id).deleteOne();
            }
            category.save()
            .then((category)=>{
                console.log('All Products DELETED In Category with this ID',+req.params.categoryId)
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json")
                res.json(category)
            })
        }else{
            console.log('Category Not Found with this ID',+req.params.categoryId)
            res.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})


// Sub-route to CRUD a product inside a category. At route http://.../category/:id/products/:productId
categoryRouter.route(`/:categoryId/products/:productId`)
.get((req,res,next)=>{
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null && category.products.id(req.params.productId)!=null){
            console.log('Product Found with this ID',+req.params.productId)
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json")
            res.json(category.products.id(req.params.productId))
        }else{
            console.log('Error Not Found with this ID')
            res.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})

.put((req,res,next)=>{
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null && category.products.id(req.params.productId)!=null){
           if(req.body.price){
            category.products.id(req.params.productId).price = req.body.price;
           }
           if(req.body.description){
            category.products.id(req.params.productId).price = req.body.description;
           }
           category.save()
            res.statusCode = 200;
            res.setHeader("Content-Type","application/json")
            res.json(category.products.id(req.params.productId))
        }else{
            console.log('Error Not Found with this ID')
            res.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on http://.../category/${req.params.categoryId}/products/${req.params.productId}`)
})
.delete((req,res,next)=>{
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null && category.products.id(req.params.productId)!=null){
            console.log('Product Found with this ID',+req.params.productId)
            category.products.id(req.params.productId).deleteOne()
            category.save()
            then(()=>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json")
                res.json(category)
            },(err) => next(err))
           
        }else{
            console.log('Error Not Found with this ID')
            res.statusCode = 404;
            return next(err)
        }
    },(err) => next(err))
    .catch((err)=> next(err))
})



module.exports = categoryRouter