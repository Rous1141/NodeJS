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
        name: 'Pizaa Dinner',
        description: `Dante's favorite food!`
    })
    newDish.save()
     .then((dish)=>{
        console.log(`New dish saved: ${dish}`)
     })
     .then((dish)=>{
        console.log(`Find the dish:${dish}`)
        return Dishes.find() // this find will return ALL dishes
     })
     .then((dishes)=>{
        console.log(`Removed the dishes: ${dishes}`)
        return Dishes.deleteMany({}) // this delete ALL dishes
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
