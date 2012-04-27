//UUU

var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var mongostore = require('connect-mongodb');
var models = require('./models.js');
var Ride;
var user = null;
    
mongoose.connect('mongodb://localhost/compartir-dev');

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.Ride = Ride = mongoose.model('Ride');
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/newride', function(req, res) {
  var user = {matricula:"d242543645", name:"Marcos Mellado"}
  res.render('newride.jade', {
    locals: {
     user: user,
     title: 'Crear nuevo viaje',
     classes: "new-ride",
     styles:["stylesheets/ui/css/redmond/jquery-ui-1.8.19.custom.css"],
     scripts: [
      "http://maps.googleapis.com/maps/api/js?sensor=false",
      "js/libs//ui/js/jquery-ui-1.8.19.custom.min.js",
      "js/libs/ui.geo_autocomplete.js",
      "js/engines/newride.js"
      ]  
    }
  });
});

app.post('/matches', function(req, res) {

	//save
	console.log(req.body);
	var rr = new Ride(req.body);
	rr.save();

  var user = {matricula:"d242543645", name:"Marcos Mellado"}
  console.log(req.body);
  res.render('matches.jade', {
    locals: {
     user: user,
     title: 'Coincidencias Encontradas',
     classes: "matching-rides", 
    }
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

