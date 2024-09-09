const mongoose = require(`mongoose`) //using mongoose schemes for data objects
const Schema = mongoose.Schema //create a Schema object

// Create a Dish schema with name and description
const dishSchema = new Schema({ 
    name:{
        type: 'string',
        required:true,
        unique:true,
    },
    description:{
        type:'string',
        required:true
    }
},{
    timestamps: true, // automatically adds createdAt and updatedAt current time
}) 

var Dishes = mongoose.model('Dish',dishSchema)
module.exports = Dishes

