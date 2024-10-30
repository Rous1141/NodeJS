const express = require('express')
const bodyParser = require('body-parser')
const categoryRouter = express.Router()
//Check Autehntication with JWT
const authenticateJWT = require('../controller/authenJWT')

//using body-parser
categoryRouter.use(bodyParser.json())

//Connect the route to Mongoose Schema
const Category = require("../models/category")
const {getCategory,putCategory,deleteCategory,postCategory,
        getCategoryById,putCategoryById,deleteCategoryById,postCategoryById
} = require("../controller/categoryController") // import the fuction from controller



categoryRouter.route('/') // route at http://.../category
    .get(getCategory)
    .post(postCategory)
    .put(putCategory)
    .delete(deleteCategory)
//end route
// Create another route to perform on each specific 'category' route at http://.../category/:id
categoryRouter.route('/:categoryId')
    .get(getCategoryById)
    .post(postCategoryById)
    .put(putCategoryById)
    .delete(deleteCategoryById)
//end route
// Sub-route to CRUD products inside a category. At route http://.../category/:id/products
categoryRouter.route(`/:categoryId/products`)
.get((req,res,next)=>{
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null){
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
            if(req.body.productName){
                category.products.id(req.params.productId).productName = req.body.productName; // Reverse
               }
           if(req.body.price){
            category.products.id(req.params.productId).price = req.body.price;
           }
           if(req.body.description){
            category.products.id(req.params.productId).description = req.body.description;// Reverse
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
    console.log('Category Found with this ID',+req.params.categoryId)
    console.log('Product Found with this ID',+req.params.productId)
    Category.findById(req.params.categoryId)
    .then((category) => {
        if(category!= null && category.products.id(req.params.productId)!=null){
            category.products.id(req.params.productId).deleteOne()
            category.save()
            .then(()=>{
                console.log("Delete Complete!!!")
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json")
                next()
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