var express = require('express');
var app = express();
var path = require('path');
var q = require('q');

app.use('/js', express.static('/home/pi/node_modules/tether/dist/js'));
app.use('/js', express.static('/home/pi/node_modules/bootstrap/dist/js'));
app.use('/js', express.static('/home/pi/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static('/home/pi/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/font', express.static('/home/pi/node_modules/font-awesome'));
app.use('/files', express.static(__dirname + '/files'));

app.use('/pages', express.static('/var/www/html'));

var jade = require('jade');
var mysql = require('mysql')
var connection = mysql.createConnection({
	host			: '',
	user			: '',
	password	: '',
	database	: ''
});

var getIP = require('ipware')().get_ip;

const hostname = '0.0.0.0';
const port = 3000;
const querystring = require('querystring');
const pageLimit = 4;

var count = 0;
var pageCount = 0;

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


function getCount() {
	var deferred = q.defer();
	connection.query('SELECT count(*) as numrows FROM entrydb', function(err, countrows, fields) {
		if(err) deferred.reject(err);
		else {
			count = countrows[0]['numrows'];
			pageCount = Math.ceil(count / pageLimit);
			deferred.resolve();
		}
	});

	return deferred.promise;
}

function isNormalInteger(str) {
	return /^\+?(|[1-9]\d*)$/.test(str);
}

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected\n");
	} else {
		console.log("Error connecting to database\n");
	}
});

app.get('/', function(req, res) {
	getCount()
		.then(function() {
			qs = querystring.parse(req._parsedUrl.query);
			if (qs.page){
				page = parseInt(qs.page);
			} else 
				page = 1;
	
			if (!isNormalInteger(page)) 
				page = 1;

			if (page > pageCount)
				page = pageCount;

			nextPage = page < pageCount;
			prevPage = page != 1;
			
			console.log(getDateTime() + " " + getIP(req).clientIp + ": Home / Blog");

			offset = pageLimit * (page-1);
			connection.query('SELECT * FROM entrydb ORDER BY ID DESC LIMIT ' + pageLimit + ' OFFSET ' + offset , function(err, r, fields) {
				res.render(__dirname + '/pages/index.jade', {
				data: r,
				curr: page,
				next: nextPage,
				prev: prevPage
				});
			});

		}, function(error) {
			console.log(error);
		}
	);
});

app.get('/portfolio', function(req, res) {
	console.log(getDateTime() + " " + getIP(req).clientIp + ": Portfolio");
	res.render(__dirname + '/pages/projects.jade');
	
});

app.get('/resume', function(req, res) {
	console.log(getDateTime() + " " + getIP(req).clientIp + ": Resume");
	res.render(__dirname + '/pages/resume.jade');
});

app.get('/template', function(req, res) {
	res.render(__dirname + '/pages/template.jade');
});

app.listen(port, function () {
	console.log(`Server running at http://${hostname}:${port}/`);
});
