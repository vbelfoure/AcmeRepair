var express = require('./node_modules/express'),
  app = express(),
  port = process.env.PORT || 8080;
  bodyParser = require('./node_modules/body-parser');
  require('./node_modules/dotenv/lib/main').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
    next();
});

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);
app.use('/apidoc', express.static('apidoc'));

console.log('todo list RESTful API server started on: ' + port);



