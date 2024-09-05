const express = require('express')
const http = require('http')
const hostname = "localhost"
const portnumber = 3000
//using express router
const dishRouter = require(`./routes/dishRouter`)
const app = express()
app.use(`/dishes`,dishRouter)
//


// app.use((req,res)=>{
//     console.log(req.headers)
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/html')
//     res.end('<html><body><h1>This is an EXPRESS SERVER</h1></body></html>')
// })

const server = http.createServer(app)

server.listen(portnumber,hostname,()=>{
    console.log(`Server running at http://${hostname}:${portnumber}`)  
    // Log the server status to the console upon starting
})