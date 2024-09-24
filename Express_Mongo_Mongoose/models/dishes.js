const mongoose = require(`mongoose`) //using mongoose schemes for data objects
const Schema = mongoose.Schema //create a Schema object

// Create a Dish schema with name and description
const commentSchema = new Schema({
    comment:{
        type: 'string',
        required:true,
    },
    author:{
        type: 'string',
        required:true,
    },
    rating:{
        type: 'string',
        required:true,
    }
},{
    timestamps: true,
}) // This is a sub-schema inside the dish schema

const dishSchema = new Schema({ 
    name:{
        type: 'string',
        required:true,
        unique:true,
    },
    description:{
        type:'string',
        required:true
    },
    comments:{
        type:[commentSchema]
        // this schema will be used to create a new comment in each dish
    }
},{
    timestamps: true, // automatically adds createdAt and updatedAt current time
}) 

var Dishes = mongoose.model('Dish',dishSchema)
module.exports = Dishes

