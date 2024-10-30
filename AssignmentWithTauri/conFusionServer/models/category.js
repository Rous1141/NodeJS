const mongoose = require(`mongoose`)
const Schema = mongoose.Schema 

const productSchema = new Schema({
    productName:{
        type: 'string',
        required:true,
        unique:true,
    },
    description:{
        type: 'string',
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    image:{
        type:'string',
        required:true,
    }
},{
    timestamps: true,
}) // This is a sub-schema inside the category schema

const categorySchema = new Schema({ 
    categoryName:{
        type: 'string',
        required:true,
        unique:true,
    },
    description:{
        type:'string',
        required:true
    },
    products:{
        type:[productSchema]
        // this schema will be used to create a new category
    }
},{
    timestamps: true, // automatically adds createdAt and updatedAt current time
}) 

var Category = mongoose.model('Category',categorySchema)
module.exports = Category

