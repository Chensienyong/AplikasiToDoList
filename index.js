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
            res.status(500).send("Fetch Data Failed.");
        }
        if (results.length > 0) {
            res.render('index', {lists: results});
        } else {
            res.render('index', {lists: null});
        }
    });
});

app.post('/', urlEncodedParser, function(req, res) {
	var data = req.body['data'];

    db.SetToDo(data, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Post Data Failed.");
            return;
        }

        res.redirect('/');
    });
});

app.get('/remove/:id', function(req, res) {
    var id = req.params.id;

    db.DeleteToDo(id, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Remove Data Failed.");
            return;
        }

        res.redirect('/');
    });
});

var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Running at http://%s:%s', host, port);
});