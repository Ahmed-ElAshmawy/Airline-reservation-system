var express = require("express");
var mongodb = require("mongodb");

var http = require("http");
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);
var mongoClient = mongodb.MongoClient;
var dbURL = "mongodb://127.0.0.1:27017/ProjectDB";

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,     Content-Type, Accept");
	next();
});

mongoClient.connect(dbURL, function (err, db) {
	if (err) { return console.dir(err); }
	else {
		var collection = db.collection("Flights");
		app.get("/", function (req, res) {
			console.log("client req..");
			collection.find().toArray(function (err, data) {
				if (err)
					console.log("No Collection");
				else {
					res.json(data);
				}
			});
		});
		app.post("/add", function (req, res) {
			var new_ticket = {
				Name: req.body.pname,
				no: parseFloat(req.body.no),
				from: req.body.from,
				to: req.body.to,
				time: req.body.time,
				price: parseFloat(req.body.price),
				status: [false, "Available"]
			}
			collection.insert(new_ticket);
		});

		app.get("/deletdata/:no", function (req, res) {
			collection.remove({
				"no": parseInt(req.params.no)
			});
		});
		app.get("/changestate/:no/:status", function (req, res) {
			if (req.params.status == "true") {
				collection.update({ "no": parseInt(req.params.no) }, { $set: { status: [false, "Available"] } });
			}
			else {
				collection.update({ "no": parseInt(req.params.no) }, { $set: { status: [true, "Reserved"] } });
			}
		});
		app.post("/updateticket", function (req, res) {
			collection.update({ "no": parseInt(req.body.no) }, { $set: { Name: req.body.pname, from: req.body.from, to: req.body.to, time: req.body.time, price: parseFloat(req.body.price) } });
		});
	}
});
app.use(express.static("./public"));
server.listen(3000);