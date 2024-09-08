
const port = 3001
const hostname = 'localhost'
const path = require('path')
//__dirname is a special var that defines the absolute path of the file it's being used
const pagesFolder = path.join(__dirname,'public/pages')
const loginPath = path.join(pagesFolder,'index.html')
const errorPath = path.join(pagesFolder,'error.html')
const homepagePath = path.join(pagesFolder,'welcome.html')
//using Express framework
const express = require("express")
//Middleware with express bodyparser
const bodyParser = require('body-parser')


const app = express()
var login = false
// using bodyParser.urlencoded feature to parse the data from html forms and you cna read it data from req.body now 
app.use(bodyParser.urlencoded({extends:true}))
//serving static page folder with express middleware express.static
app.use(express.static(pagesFolder)) 
try {
	app.get('/' || 'index.html',(req,res)=>{
		//start the server at the login page
		res.sendFile(loginPath)
	})
	//route to handle login requests
	app.post('/login',(req,res)=>{
		//the correct credential
		const credential ={
			username: 'admin',
			password: '123456'
		}
		//the sent form data from user
		var username = req.body.username
		var password = req.body.password
		if(username===credential.username && password===credential.password){
			login = true
			console.log('Login successful')
			res.send('<script>alert("Login Successfully!");window.location.href="/welcome"</script>')
		}
		else{
			console.log('Login failed')
			res.send('<script>alert("Invalid credentials! Check your username and password again");window.location.href="/"</script>')
		}
	})
	
	app.get('/welcome',(req,res)=>{
		//send the user to homepage 
		if(login===true){
			res.sendFile(homepagePath)
		}
		else{
			res.send('<script>alert("Please login to go here");window.location.href="/"</script>')
		}
	})
} catch (error) {
	app.get('/',(req,res)=>{
		res.sendFile(errorPath)
	})
}

	


app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})