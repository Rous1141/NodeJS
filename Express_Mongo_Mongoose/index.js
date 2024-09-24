const express = require('express')
const hostname = "localhost"
const portnumber = 3000
//using express router
const dishRouter = require(`./routes/dishRouter`)
const app = express()
app.use(`/dishes`,dishRouter)
//
app.use(express.static('./public/Pages'))
app.get('/',(res,req)=>{
    console.log(req.headers)
    res.sendFile(express.static('./public/Pages/index.html'))
})


app.listen(portnumber,hostname,()=>{
    console.log(`Server running at http://${hostname}:${portnumber}`)  
    // Log the server status to the console upon starting
})