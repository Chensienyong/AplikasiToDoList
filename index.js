var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mysql      = require('mysql'),
    db         = require('./src/database');

var urlEncodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static('./src/css'));

app.set('view engine', 'jade');
app.set('views', './src/views');

app.get('/', function(req, res) {
    db.GetToDo(function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Database Query Failed.");
        }
console.log(results);
        res.render('index', {lists: results});
    });
});

app.post('/', urlEncodedParser, function(req, res) {
	console.log(req);
});

var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
});
