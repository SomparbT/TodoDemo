// MEAN Stack RESTful API todoList Demo

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('todoList', ['todoList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/todoList', function (req, res) {
  console.log('I received a GET request');
 // 15-19 Pulls data from database. Gets everything. Sends it back in json format.
  db.todoList.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/todoList', function (req, res) {
  console.log(req.body);
  db.todoList.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/todoList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todoList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/todoList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.todoList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/todoList/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.todoList.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, date: req.body.date , complete: req.body.complete}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8000);
console.log("Server running on port 8000");