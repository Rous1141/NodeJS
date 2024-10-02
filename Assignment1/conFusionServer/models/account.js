const mongoose = require(`mongoose`)
const Schema = mongoose.Schema 

const accountSchema = new Schema({
   userName:{
    required: true,
    type: String,
    unique: true,
   },
   password:{
    required: true,
    type: String,
   }
},{
    timestamps: true,
}) // This is a sub-schema inside the category schema


var Account = mongoose.model('Account',accountSchema)
module.exports = Account

