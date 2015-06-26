var express    = require('express'),
    bodyParser = require('body-parser'),
    mysql      = require('mysql'),
    flash      = require('connect-flash'),
    session    = require("express-session"),
    db         = require('./src/database'),
    app        = express();

var urlEncodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static('./src/css'));

var SESSION_INFO = {
    secret: 'iubawfk263637-blzomemhd',
    cookie: { maxAge: 3600 * 1000 },
    resave: true,
    saveUninitialized: false
};

app.use(session(SESSION_INFO));
app.use(flash());

app.set('view engine', 'jade');
app.set('views', './src/views');

app.get('/', function(req, res) {
    db.GetToDo(function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Fetch Data Failed.");
            return;
        }

        var messageSuccess = req.flash('success'),
            messageFailure = req.flash('error'),
            renderdata = {};

        if (messageSuccess.length > 0) {
            renderdata.flashSuccess = messageSuccess;
        }
        if (messageFailure.length > 0) {
            renderdata.flashFailure = messageFailure;
        }

        if (results.length > 0) {
            renderdata.lists = results;
        }

        res.render('index', renderdata);
    });
});

app.post('/', urlEncodedParser, function(req, res) {
	var data = req.body['data'];
    if (data.length > 50) {
        req.flash('error', 'Data ToDo maksimal 50karakter!');
        res.redirect('/');
        return;
    }

    db.SetToDo(data, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Post Data Failed.");
            return;
        }

        req.flash('success', 'Data berhasil ditambah!');
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

        req.flash('success', 'Data berhasil dihapus!');
        res.redirect('/');
    });
});

var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Running at http://%s:%s', host, port);
});
