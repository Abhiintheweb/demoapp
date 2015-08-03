'use strict'

var mysql = require('mysql');//
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'my_db'
});

connection.connect(function(err) {//mysql connection

    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

});



//adding products by category
exports.addProducts = function(req, res) {

    console.log(req.query.productName);

    var post = {
        productName: req.query.productName,
        product_category: req.query.categoryId,
        status: 1
    };
    var query = connection.query('INSERT INTO products SET ?', post, function(err, result) {
        // Neat!

        if (err) {
            res.json({
                code: 198,
                data: err
            });
        }
        if (result) {
            res.json({
                code: 200,
                message: "Sucessfully added product",
                insertId: result.insertId
            });

        }


    });

}
//adding categories
exports.categories = function(req, res) {


    var post = {
        categoryName: req.query.categoryName
    };
    var query = connection.query('INSERT INTO products_category SET ?', post, function(err, result) {
        // Neat!

        if (err) {
            res.json({
                code: 198,
                data: err
            });
        }
        if (result) {
            res.json({
                code: 200,
                message: "Sucessfully added product",
                insertId: result.insertId
            });

        }


    });


}



//fetching all products
exports.getallpro = function(req, res) {


    var data = [];

    connection.query('SELECT * FROM products where status=1 order by product_id desc LIMIT ' + req.query.count + '')

    .on('error', function(err) {
        console.log(err)

        // Handle error, an 'end' event will be emitted after this as well
    })

    .on('result', function(row) {

            // console.log(row);
            // Pausing the connnection is useful if your processing involves I/O
            data.push(row);
        })
        .on('end', function() {

            var a, b;
            if (data.length > 0) {
                a = "sucess";
                b = 200;
            } else {
                a = "failed";
                b = 198;
            }
            res.json({
                code: b,
                data: data,
                sataus: a
            });
            // all rows have been received
        });


}

//getting all products by category
exports.productsbycategoryId = function(req, res) {




    var data = [];

    connection.query('select products_category.categoryId,products.*  from products_category join products on products.product_category=products_category.categoryId  where categoryId=' + req.query.category + '')

    .on('error', function(err) {
        console.log(err)

        // Handle error, an 'end' event will be emitted after this as well
    })

    .on('result', function(row) {

            // console.log(row);
            // Pausing the connnection is useful if your processing involves I/O
            data.push(row);
        })
        .on('end', function() {

            var a, b;
            if (data.length > 0) {
                a = "sucess";
                b = 200;
            } else {
                a = "Category Id Not Available";
                b = 198;
            }
            res.json({
                code: b,
                data: data,
                sataus: a
            });
            // all rows have been received
        });

}
