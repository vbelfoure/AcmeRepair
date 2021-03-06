var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
    next();
});

var routes = require('./routes/routes');
routes(app);

app.listen(port);
app.on('listening', function () {
    routes.initVehicles();
});

app.use('/apidoc', express.static('apidoc'));

console.log('Server listening on: ' + port);