
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = null;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/new', function(req, res) {
  var user = {matricula:"d242543645", name:"Marcos Mellado"}
  res.render('newride.jade', {
    locals: { 
    	user: user,
    	title: 'Crear nuevo viaje',
    	classes: "new-ride"
    }
  });
});

app.get('/matches', function(req, res) {
  var user = {matricula:"d242543645", name:"Marcos Mellado"}
  res.render('matches.jade', {
    locals: { 
    	user: user,
    	title: 'Coincidencias Encontradas',
    	classes: "matching-rides"
    }
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
