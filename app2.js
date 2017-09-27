var express = require('express');
var app = express();
var jade = require('jade');
var MongoClient = require('mongodb').MongoClient;
var db;
var getIP = require('ipware')().get_ip;

app.use('/js', express.static('/home/pi/node_modules/tether/dist/js'));
app.use('/js', express.static('/home/pi/node_modules/bootstrap/dist/js'));
app.use('/js', express.static('/home/pi/node_modules/jquery/dist'));
app.use('/js', express.static('/home/pi/node_modules/jquery-scrollify'));
app.use('/js', express.static('/home/pi/node_modules/simplebar/dist'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static('/home/pi/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/font', express.static('/home/pi/node_modules/font-awesome'));
app.use('/files', express.static(__dirname + '/files'));
app.use('/favicon', express.static(__dirname + '/favicon'));
app.use('/', express.static(__dirname + '/build'));
app.use('/pages', express.static('/var/www/html'));

const hostname = '0.0.0.0';
const port = 3000;

function getDateTime() {
	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return month + "/" + day + " " + hour + ":" + min;
}


app.get('/template', function(req, res) {
	res.render(__dirname + '/pages/template.jade');
});

app.get('/api/entries', function(req, res) {
  console.log(getDateTime() + " " + getIP(req).clientIp);
  db.collection("entries").find().sort({"entry_date": -1}).toArray(function(err, docs) {
    res.json(docs);
  });
});

MongoClient.connect('mongodb://localhost/blog', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(port, function() {
    var port = server.address().port;
    console.log('Server running at http://$(hostname):$(port)/');
  });
});
