var express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var getIP = require('ipware')().get_ip;

const pw = '';

var app = express();

app.use('/font', express.static('/home/pi/node_modules/font-awesome'));
app.use('/files', express.static(__dirname + '/files'));
app.use(express.static(path.join(__dirname + '/build')));
app.use('/blog/images', express.static(__dirname + '/blog/images'));

app.use('/pages', express.static('/var/www/html'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const port = 3000;

app.get('/portfolio', function (req, res) {
  console.log(getIP(req).clientIp + ": Portfolio");
  res.sendFile(path.join(__dirname, '/build', 'index.html'))
});

app.get('/resume', function (req, res) {
  console.log(getIP(req).clientIp + ": Resume");
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

app.get('/log', function(req, res) {
  res.sendFile(path.join(__dirname, '/log', 'log.html'));
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
  let userIP = getIP(req).clientIp;
  let re = /192.168.1.*/i
  
  
  if(!userIP.match(re)) {
    let query = {ip: userIP};
    let newvalues = {
                      $inc: {visit: 1}, 
                      $set: {date: new Date()}
                    };
    let options = {upsert: true, safe: false};

    db.collection("log").updateOne(query, newvalues, options, function (err, docs) {
      if (err) {
        throw err;
      } else {
        console.log(userIP + ": Home / Blog");
      }
    });

  }
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

app.get('/api/log', function(req, res) {
  db.collection("log").find().sort({"date": -1}).toArray(function(err, docs) {
    res.json(docs);
  });
});

MongoClient.connect('mongodb://localhost/blog', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(port, function() {
    console.log('Server running');
  });
});