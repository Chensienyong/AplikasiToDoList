var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: true});

app.use(express.static('./src/css'));

app.set('view engine', 'jade');
app.set('views', './src/views');

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/', urlEncodedParser, function(req, res) {
	console.log(req);
});

var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
});
