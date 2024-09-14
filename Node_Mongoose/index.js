const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const Nations = require('./models/nations')

// Connect to MongoDB
const hostname = 'localhost'
const port = 27017;
const dbType = 'conFusion'
const url = `mongodb://${hostname}:${port}/${dbType}`
const conn = mongoose.connect(url)

conn.then((db)=>{
    console.log(`Performs on Nation model`)
    // Add a nation
    var newNation = Nations({
        name: 'Gensokyo',
        description:"Land of Fantasy"
    })
    newNation.save()
    .then((nation)=>{
        console.log('A new nation: '+nation)
        return Nations.findOne({"name":"Gensokyo"}).exec()
    })
    .then((nation)=>{
       console.log('Update nation with ID: '+nation._id)
       return Nations.findByIdAndUpdate(nation._id,{
        $set:{
            description: "Land of Magic and Senseless Fantasy"
        }
       },{
        new: true
       }).exec()
    })
    .then((nation)=>{
        console.log('Updated nation: '+nation)
        //Add an event for the nation
        nation.national_events.push({
            festival_name: "Bullet Hell festival",
            host: "Hakurei Reimu",
        })
        return nation.save()
    })
    .then((nation)=>{
       console.log("Nation now have event: "+nation)
    })

    .then(()=>{
        return Nations.deleteOne({"name": "Gensokyo"}).exec()
    })
    .then(()=>{
        return Nations.deleteOne({"name": "LunarCapital"}).exec()
    })
    .then((nation)=>{
        console.log('All nations after deletion: '+nation)
        console.log(`Closing Performs on Nation model`)
        return mongoose.connection.close() // close connection to the DB
    })
    .catch((err)=>{
        console.log(`Error: ${err}`)
        return mongoose.connection.close() // close connection to the DB
    })
})

// conn.then((db)=>{
//     console.log(`Connected to MongoDB ${db}!`)
//     var newDish= Dishes({
//         name: 'Beef Chessy Pizza',
//         description: `Dante's favorite food!`
//     })
//     newDish.save()
//     //  .then((dish)=>{
//     //     console.log(`Find the dish:${dish}`)
//     //     return Dishes.find({}).exec() // this find will return ALL dishes
//     //  })
//     //  .then((dishes)=>{
//     //     console.log(`Removed the dishes: ${dishes}`)
//     //     return Dishes.deleteMany({}).exec() // this delete ALL dishes
//     //  })
//     .then((dish)=>{
//         console.log(`Find the dish by its ID: ${dish._id}`)
//         //note: _id is automatically added to the object when create
//         return Dishes.findById(dish._id)
//     })
//     .then((dish)=>{
//         console.log(`Updated the dish: ${dish}`)
//         return Dishes.findByIdAndUpdate(dish._id,{
//             $set:{
//                 description: 'Updated Pizza Dinner! Pizza is delicious and cheesy'
//             }
//         },{
//             new:true
//         })
//         .exec() //execute query
//     })
//     .then((dish)=>{
//       console.log("Add comments to the dish")
//       dish.comments.push({
//         comment: "This pizza is fantastic! Now where's my Strawberry Sundae?",
//         author: 'Dante Redgrave',
//         rating: 9
//       })
//       dish.comments.push({
//         comment: "This pizza has no motivation...",
//         author: 'Vergil Redgrave',
//         rating: 5
//       })
//       return dish.save()
//     })
//     .then((dish)=>{
//         return Dishes.findById(dish._id)
//     })
//     .then((dish)=>{
//         console.log(`The dish with comments: ${dish}`)
//         return Dishes.deleteMany({"name":"Pizza"}) //delete the dish witht that id
//     })
//      .then(()=>{
//         console.log(`Closing Performs on Dishes model`)
//         //return mongoose.connection.close() // close connection to the DB
//      })
//      .catch((err)=>{
//         console.log(`Error: ${err}`)
//         //return mongoose.connection.close() // close connection in case of error and report in log
//         return null
//     })
// })
