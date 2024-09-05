//import ErrorPage from './public/Pages/error.js'; Can't import yet

//Configuration for port number
const http = require("http")
const hostname = 'localhost'
const port = '3000'

//Creating more configuration
const fs = require("fs")
const path = require("path")


const server = http.createServer((req, res) => {
	console.log("Starting server with Request: " + req.url + ' by Method: ' + req.method)
	var htmlFolder = "Pages"
	var fileUrl = null;
	if (req.method === 'GET') {
		if (req.url === "/") {
			fileUrl = htmlFolder+"/index.html"
		}
		else {
			fileUrl = htmlFolder+req.url
		}
		var filePath = path.resolve(`./public/${fileUrl}`)
		const errorPage = `./public/`+htmlFolder + "/error.html"
		const fileExt = path.extname(filePath)
		if (fileExt === '.html') {
			fs.exists(filePath, (exists) => {
				if (!exists) {
					res.statusCode = 404
					console.log(`File ${filePath} doesn't exist`)
					//ErrorPage(res.statusCode,`File ${filePath} doesn't exist`)
					res.setHeader('Content-Type', 'text/html')
					filePath = errorPage
					fs.createReadStream(filePath).pipe(res)
				}
				else {
					res.statusCode = 200
					res.setHeader('Content-Type', 'text/html')
					fs.createReadStream(filePath).pipe(res)
				}
			})
		}
		else {
			res.statusCode = 404
			console.log(`File extension ${fileExt} not supported`)
			res.setHeader('Content-Type', 'text/html')
			filePath = errorPage
			fs.createReadStream(filePath).pipe(res)
		}
	}
	else {
		res.statusCode = 405
		res.setHeader('Content-Type', 'text/html')
		res.end(`<html><body><h1>Error 405! Method: ${req.method} not supported </h1></body></html>`)
	}
})

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})