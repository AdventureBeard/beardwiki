"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('superagent');


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    request
        .get('localhost:5984/notions/_all_docs?include_docs=true')
        .end(function(err, docs) {
            var results = JSON.parse(docs.text);
            var notions = results.rows.map(function(row) {
                return row.doc;
            });
            res.render('index', { notions: notions });
        });
});

// Notion Viewer Route
var route_notion = require(__dirname + '/views/notion/notion.js')(request);
app.get('/:id', route_notion);


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.listen(3000, function () {
    console.log('Application running on port 3000');
});


