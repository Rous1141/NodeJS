const mongoose = require(`mongoose`)
const Schema = mongoose.Schema 

const categorySchema = new Schema({ 
    categoryName:{
        type: 'string',
        required:true,
        unique:true,
    },
    categoryDescription:{
        type:'string',
        required:false
    },
},{
    timestamps: true, // automatically adds createdAt and updatedAt current time
}) 

const productSchema = new Schema({
    productName:{
        type: 'string',
        required:true,
        unique:true,
    },
    productDescription:{
        type: 'string',
        required:true,
    },
    price:{
        type: Number,
        required:true,
        min:0,
        max:9999
    },
    image:{
        type:'string',
        required:true,
    },
    isFeature:{
        type:Boolean,
        default:false
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,ref:"Category",
        require:true
    }
},{
    timestamps: true,
}) // This is a sub-schema inside the category schema



var Product = mongoose.model('product',productSchema)
var Category = mongoose.model('category',categorySchema)
module.exports = {Product , Category}

