var express = require('express');
var router = express.Router();
// router.get('/check-authen',jwtAuthen,function( req, res){
//   res.sendStatus(200);
// })

router.get('/',function( req, res, next){
  res.render(`loginPage`)
})

router.post('/login',function( req, res, next){
  res.render(`loginPage`)
})

router.get('/register',function( req, res, next){
  res.render(`registerPage`)
})

router.post('/register',async function( req, res, next){
  const { username, password } = req.body;
  const fetchData = await fetch("http://localhost:3002/api/register",{method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });
  var code = "Login With Your New Account"
  if(fetchData.ok){
    res.redirect(`/`);
  }
})

router.get('/home', async function(req, res) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const token = req.cookies.token; // get the token store in the cookie
  if(token!==null){
    const fetchData = await fetch("http://localhost:3002/api/category",{method: "GET",headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
      },})
    var data = await fetchData.json();
    res.render('homepage', {data});
  }
});
//View Engine
router.get('/category/insert',async function( req, res, next){
  res.render(`categoryAdd`)
})

router.post('/category/insert',async function( req, res, next){
  const token = req.cookies.token;
  if (token) {
    const { categoryName, categoryDescription } = req.body;
    try {
      // Use POST to add the product
      const fetchData = await fetch(`http://localhost:3002/api/category`, {
        method: 'POST',  // POST to insert
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ categoryName, categoryDescription })
      });
      if (fetchData.ok) {
        res.redirect(`/home`);
      } else {
        throw new Error(`Error adding category: ${fetchData.statusText}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding category.');
    }
  }
})

router.get('/category/:categoryId/update', async function(req, res){
  const token = req.cookies.token;
  if(token!==null){
    // get a category info
    var categoryId = req.params.categoryId
    console.log(categoryId)
    const fetchData = await fetch(`http://localhost:3002/api/category/${categoryId}`,{method: "GET",headers: { 
      'Authorization': `Bearer ${token}` 
      },})
    var category = await fetchData.json();
    res.render('categoryEdit', {category});
  }
});

router.post('/category/:categoryId/update', async function(req, res){
  const token = req.cookies.token;
  if(token!==null){
    const { categoryName, categoryDescription } = req.body;
    var categoryId = req.params.categoryId
    console.log(categoryId)
    const fetchData = await fetch(`http://localhost:3002/api/category/${categoryId}`,{
      method: 'PUT',  // PUT to update
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryName, categoryDescription })
    })
    if (fetchData.ok) {
      res.redirect(`/home`);
    }
  }
});

router.get('/category/:categoryId/delete', async function(req, res){
  const token = req.cookies.token;
  if(token!==null){
    // get a list of products from a category
    var categoryId = req.params.categoryId
    console.log(categoryId)
    await fetch(`http://localhost:3002/api/category/${categoryId}`,{method: "DELETE",headers: {
      'Authorization': `Bearer ${token}` 
      },})
      res.redirect(`/home`);
  }
});

router.get('/category/:categoryId', async function(req, res){
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const token = req.cookies.token;
  if(token!==null){
    // get a list of products from a category
    var categoryId = req.params.categoryId
    console.log(categoryId)
    const fetchData = await fetch(`http://localhost:3002/api/category/${categoryId}/products`,{method: "GET",headers: { 
      'Authorization': `Bearer ${token}` 
      },})
    var data = await fetchData.json();
    res.render('product', {data,categoryId});
  }
});

router.get('/category/:categoryId/product/update/:productId', async function(req, res){
  const token = req.cookies.token;
  if(token!==null){
    // get a list of products from a category
    var categoryId = req.params.categoryId
    var productId = req.params.productId
    console.log(productId)
    const fetchData = await fetch(`http://localhost:3002/api/category/${categoryId}/products/${productId}`,{method: "GET",headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
      },})
    var product = await fetchData.json();
    res.render('productEdit', {product,categoryId});
  }
});

router.get('/category/:categoryId/product/insert', async function(req, res){
  const token = req.cookies.token;
  if(token!==null){
    // get a list of products from a category
    var categoryId = req.params.categoryId
    res.render('productAdd', {categoryId});
  }
});

router.get('/category/:categoryId/product/delete/:productId', async function(req, res){
  const token = req.cookies.token;
  if(token!==null){
    // get a list of products from a category
    var categoryId = req.params.categoryId
    var productId = req.params.productId
    console.log(productId)
    await fetch(`http://localhost:3002/api/category/${categoryId}/products/${productId}`,{method: "DELETE",headers: {
      'Authorization': `Bearer ${token}` 
      },})
      res.redirect(`/category/${categoryId}`);
  }
});

router.post('/category/:categoryId/product/:productId/update', async function(req, res) {
  const token = req.cookies.token;
  if (token) {
    const categoryId = req.params.categoryId;
    const productId = req.params.productId;
    const { productName, description, price, image } = req.body;
    try {
      // Use PUT to update the product
      const fetchData = await fetch(`http://localhost:3002/api/category/${categoryId}/products/${productId}`, {
        method: 'PUT',  // PUT to update
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productName, description, price, image })
      });
      if (fetchData.ok) {
        res.redirect(`/category/${categoryId}`);
      } else {
        throw new Error(`Error updating product: ${fetchData.statusText}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating product.');
    }
  }
});

router.post('/category/:categoryId/product/insert', async function(req, res) {
  const token = req.cookies.token;
  if (token) {
    const categoryId = req.params.categoryId;
    const { productName, description, price, image } = req.body;
    try {
      // Use POST to add the product
      const fetchData = await fetch(`http://localhost:3002/api/category/${categoryId}/products`, {
        method: 'POST',  // POST to insert
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productName, description, price, image })
      });
      if (fetchData.ok) {
        res.redirect(`/category/${categoryId}`);
      } else {
        throw new Error(`Error adding product: ${fetchData.statusText}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding product.');
    }
  }
});

router.get('/register',function( req, res, next){
  res.render(`register`)
})

module.exports = router;
