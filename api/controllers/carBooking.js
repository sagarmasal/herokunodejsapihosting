const express = require('express');
const router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage,
	localStorage = new LocalStorage('./scratch');

router.fetchCarType = function (req, callback) {
	var response = ["Premium", "Go"]
	callback(null, response);
}

router.fetchCarDetails = function (req, callback) {
	if (req.body.type != null && req.body.type != undefined && req.body.type != "") {
		var car = req.body.type;
		console.log(car)
		if (car == "Premium") {
			var response = [
				{
					"car": "Premium",
					"details": ['Rs. 75 per km', 'Swift Dezire', 'White']
				}]
		}
		else if (car == "Go") {
			var response = [
				{
					"car": "Go",
					"details": ['Rs. 45 per km', 'Swift', 'White']
				}]
		}

		callback(null, response);
	}
}

router.registerUser = function (req, callback) {
	if (req.body.email != null && req.body.email != undefined && req.body.email != ""
		&& req.body.name != null && req.body.name != undefined && req.body.name != ""
		&& req.body.password != null && req.body.password != undefined && req.body.password != "") {
		var userCred = []
		userCred.push(req.body.name)
		userCred.push(req.body.email)
		userCred.push(req.body.password)

		localStorage.setItem(req.body.email, userCred)
		var data = localStorage.getItem(req.body.email)
		var response = [
			{
				"status": "1",
				"message": "User registration successful. Your email ID is your user ID."
			}
		]

		callback(null, response);
	}
}


module.exports = router;