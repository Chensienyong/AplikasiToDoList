var express = require('express'),
    app     = express();

app.set('view engine', 'jade');
app.set('views', '.src/views');

app.get('/', function(req, res) {
    res.render('index');
});

var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
});
