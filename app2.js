var password = "";

var express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

var app = express();

app.use('/images', express.static(__dirname + '/images'));
app.use('/font', express.static('/home/pi/node_modules/font-awesome'));
app.use('/files', express.static(__dirname + '/files'));
app.use('/favicon', express.static(__dirname + '/favicon'));
app.use('/', express.static(__dirname + '/build'));
app.use('/blog/images', express.static(__dirname + '/blog/images'));

app.use('/pages', express.static('/var/www/html'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var jade = require('jade');

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var db;

var getIP = require('ipware')().get_ip;

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

app.get('/portfolio', function (req, res) {
  res.sendFile(path.join(__dirname, '/build', 'index.html'))
});

app.get('/resume', function (req, res) {
  res.sendFile(path.join(__dirname, '/build', 'index.html'))
});

app.get('/blog/post', function(req, res) {
  res.sendFile(path.join(__dirname, '/blog', 'post.html'));
});

app.post('/blog/post', function(req, res){
  var sentData = req.body.postingData;

  if(sentData[3]['value'] === password){
    db.collection("entries").insert({title: sentData[0]['value'],
    entry_date: sentData[1]['value'],
    body: sentData[2]['value']});
    res.end("done");
  } else {
    console.log("Password used: " + sentData[3]['value']);
    res.end("pw")
  }
});

app.get('/blog/edit', function(req, res) {
  res.sendFile(path.join(__dirname, '/blog', 'edit.html'));
});

app.get('/blog/editor/:id', function(req, res) {
  res.render(__dirname + "/blog/editor", {_id: req.params['id']});
});

app.post('/blog/editor/:id', function(req, res) {
  var sentData = req.body.postingData;

  
  if(sentData[3]['value'] === password){
    var o_id = new mongo.ObjectID(req.params['id']);
    var query = {_id: o_id};
    
    var newvalues = {$set: {title: sentData[0]['value'],
                            entry_date: sentData[1]['value'],
                            body: sentData[2]['value']}};
    
    db.collection('entries').updateOne(query, newvalues, function(err, r){
      if (err) throw err;
    });
    
    res.end("done")
  } else {
    console.log("Password used: " + sentData[3]['value']);
    res.end("pw")
  }
  
});


app.get('/api/entries', function(req, res) {
  db.collection("entries").find().sort({"entry_date": -1}).toArray(function(err, docs) {
    res.json(docs);
  });
});

app.get('/api/entries/:id', function(req, res) {
  var o_id = new mongo.ObjectID(req.params['id']);
  var query = {_id: o_id};
  db.collection("entries").find(query).toArray(function(err, docs) {
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
