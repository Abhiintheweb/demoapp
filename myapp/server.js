var express = require('express')
      ,http = require('http')
      ,path = require('path')
      ,app = express()
      ,products=require('./controller/product.js');//requiring controller





app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));


//Routes refer controller/productjs
app.get('/get-all-products',products.getallpro);

app.get('/add-products',products.addProducts);

app.get('/add-categories',products.categories);

app.get('/get-products-by-category',products.productsbycategoryId)



app.get('/',function(req,res){
  var data=[{"addProducts":"http://localhost:3000/add-products/?productName=sweet&categoryId=10"},
           {"add-categories":"http://localhost:3000/add-categories?categoryName=beverages"},
         {"all-products":"http://localhost:3000/get-all-products?count=1"},
       {"productsbycategoryId":"http://localhost:3000/get-products-by-category?category=1"}];
res.json(data);


})

//routing end here











http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
