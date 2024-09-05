var rectangle = {
	parameter:(x,y)=>((x+y)/2),
	area:(x,y)=>(x*y)
}

function calRectangle( a, b){
	console.log(`\nCalculating Reg with L = ${a} and W = ${b}: \n`)
	if(a<=0 || b<=0){
		console.log("The shape doesn't exist, L and W must larger than 0 (zero) :>\n")
	}
	else{
		console.log(`Reg parameter: ${rectangle.parameter(a,b)}\n`)
		console.log(`Reg area: ${rectangle.area(a,b)}\n`)
	}
}

calRectangle(1,2)
calRectangle(3,4)
calRectangle(0,4)