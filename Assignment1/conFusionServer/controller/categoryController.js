const Category = require("../models/category")
     function CategoryController(){
         const getCategory = async(req, res, next)=>{
            await Category.find({})
            .then((category) => {
                res.statusCode = 200
                res.json(category)
            }, (err) =>
                next(err))
            .catch((err) => next(err))
        }
        const postCategory = async(req, res, next)=>{
            Category.create(req.body)
            .then((category) => {
                console.log('Category Created! ',+category)
                res.statusCode = 200
                res.json(category)
            }, (err) =>
                next(err))
            .catch((err) => next(err))
        }
        const putCategory = async(req, res, next)=>{
            res.statusCode = 403;
            res.end('PUT operation not supported on /category')
        }
        const deleteCategory = async(req, res, next)=>{
            Category.deleteMany({})
            .then((respone) => {
                console.log('All categories deleted!')
                res.statusCode = 200
                res.json(respone)
            }, (err) => next(err))
            .catch((err) => next(err))
        }

        const getCategoryById = async(req, res, next)=>{
            Category.findById(req.params.categoryId)
            .then((category) => {
                res.statusCode = 200
                console.log("Found the category: ",+category.categoryName)
                res.json(category)
            }, (err) => next(err))
            .catch((err) => next(err))
        //res.end(`Getting the dish with the dish ID: ${req.params.categoryId}`)
        }
      
        const putCategoryById = async(req, res, next)=>{
            Category.findById(req.params.categoryId)
            .then((category) => {
                if(category!= null){
                    if(req.body.categoryName){
                        category.categoryName = req.body.categoryName;
                       }
                   if(req.body.description){
                    category.description = req.body.description;
                   }
                   category.save()
                    res.statusCode = 200;
                    res.setHeader("Content-Type","application/json")
                    res.json(category)
                }else{
                    console.log('Error Not Found with this ID')
                    res.statusCode = 404;
                    return next(err)
                }
            })
        }
        const deleteCategoryById = async(req, res, next)=>{
            Category.findByIdAndDelete(req.params.categoryId)
            .then(() => {
                    res.statusCode = 200
                    console.log(`Removed the category with the ID: ${req.params.categoryId}`)
                }, (err) => next(err))
            // res.end(`Delete the dish with the ID: ${req.params.categoryId}`)
        }
        const postCategoryById = async(req, res, next)=>{
            res.statusCode = 403;
            res.end(`POST operation not supported on /category/${req.params.categoryId}`)
        }
        return {
            getCategory,
            postCategory,
            putCategory,
            deleteCategory,
            getCategoryById,
            putCategoryById,
            deleteCategoryById,
            postCategoryById
        }
    
     }
module.exports = CategoryController(); // export Controller