const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

// Connect to MongoDB
const hostname = 'localhost'
const port = 27017;
const dbType = 'conFusion'
const url = `mongodb://${hostname}:${port}/${dbType}`
const conn = mongoose.connect(url)

conn.then((db)=>{
    console.log(`Connected to MongoDB ${db}!`)
    var newDish= Dishes({
        name: 'Pizza Dinner',
        description: `Dante's favorite food!`
    })
    newDish.save()
    //  .then((dish)=>{
    //     console.log(`Find the dish:${dish}`)
    //     return Dishes.find() // this find will return ALL dishes
    //  })
    //  .then((dishes)=>{
    //     console.log(`Removed the dishes: ${dishes}`)
    //     return Dishes.deleteMany({}) // this delete ALL dishes
    //  })
    .then((dish)=>{
        console.log(`Find the dish by its ID: ${dish._id}`)
        //note: _id is automatically added to the object when create
        return Dishes.findById(dish._id)
    })
    .then((dish)=>{
        console.log(`Updated the dish: ${dish}`)
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{
                description: 'Updated Pizza Dinner! Pizza is delicious and cheesy'
            }
        },{
            new:true
        })
        .exec() //execute query
    })
    .then((dish)=>{
      console.log("Add comments to the dish")
      dish.comments.push({
        comment: "This pizza is fantastic! Now where's my Strawberry Sundae?",
        author: 'Dante Redgrave',
        rating: 9
      })
      dish.comments.push({
        comment: "This pizza has no motivation...",
        author: 'Vergil Redgrave',
        rating: 5
      })
      return dish.save()
    })
    .then((dish)=>{
        return Dishes.findById(dish._id)
    })
    .then((dish)=>{
        console.log(`The dish with comments: ${dish}`)
        return Dishes.deleteOne(dish._id)
    })
     .then(()=>{
        console.log(`Closing Connection`)
        return mongoose.connection.close() // close connection to the DB
     })
     .catch((err)=>{
        console.log(`Error: ${err}`)
        return mongoose.connection.close() // close connection in case of error and report in log
     })
})
