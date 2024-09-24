const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    festival_name:{
        type: String,
        required: true,
    },
    host:{
        type: String,
        required: true,
    } 
})

const nationSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    descriptions: {
        type: String
    },
    national_events:[eventSchema]
}, {
    timestamps: true
})

const Nations = mongoose.model('Nation', nationSchema)
module.exports = Nations