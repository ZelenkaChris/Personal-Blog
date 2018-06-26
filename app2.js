var express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

const pw = '';

var app = express();

app.use('/font', express.static('/home/pi/node_modules/font-awesome'));
app.use('/files', express.static(__dirname + '/files'));
app.use('/', express.static(__dirname + '/build'));
app.use('/blog/images', express.static(__dirname + '/blog/images'));

app.use('/pages', express.static('/var/www/html'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const port = 3000;

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

  if(sentData[3]['value'] === pw){
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

  
  if(sentData[3]['value'] === pw){
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
    console.log('Server running');
  });
});
