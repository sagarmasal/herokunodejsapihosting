'use strict';
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');


var app = express();
var carBooking = require('./api/controllers/carBooking')
app.use('/carbooking/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// it shows  jason data in raw format
 /* app.get("/carbooking/api-docs", (req, res) => {
    res.send(swaggerDocument);
})  */


app.get("/", (req, res) => {
    res.send("welcome to new ride");
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

 

app.get('/carbooking/fetchCarType', (req, res) => {
    carBooking.fetchCarType(req, function (err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data)
        }
    })
})

 

app.post('/carbooking/fetchCarDetails', (req, res) => {
    carBooking.fetchCarDetails(req, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(data);
            res.json(data[0]);
        }
    })
}) 
 
app.post('/carbooking/registerUser', (req, res) => {
    carBooking.registerUser(req, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data[0]);
        }
    })
})

 

 

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))

 

module.exports = app;