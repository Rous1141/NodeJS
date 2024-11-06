const mongoose = require(`mongoose`)
const Schema = mongoose.Schema 

const accountSchema = new Schema({
   username:{
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
}) 


var User = mongoose.model('User',accountSchema)
module.exports = User

