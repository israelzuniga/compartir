console.log("2012 Compart.ir // Shareari.de");

/**
 * Module dependencies.
 */



var express	= 	require('express'),
    routes	=	require('./routes'),
	mongoose = require('mongoose'),
    user = null;

mongoose.connect('mongodb://localhost/compartir_dev'); // connected to Mongoose dev DB
console.log('Modules loaded and connected to mongodb://localhost/compartir_dev');
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


/*

//schema
var Schema = mongoose.Schema;
	
var Rou = new Schema({
	, type_u	: Number
	, origin	: String
	, destination	: String
	, sd_time	: String
	, sr_time	: String
	, comments	: String
});
//revisar validación en http://mongoosejs.com/docs/validation.html

mongoose.model('Rou', Rou);  */

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


app.post('/matches', function(req, res) {
	//Log and store
	console.log('Lobuki del tipo  ' + req.body.type_u + ' tiene el origen ' + req.body.origin + ' con destino ' + req.body.destination + ' a la hora de salida ' + req.body.schedule_departure_time + ' con hora de regreso ' + req.body.schedule_return_time + ' con los comentarios extras: ' + req.body.comments);
/*	var RouteLobuki = new Rou({
		type_u	: req.body.type_u
		, origin	: req.body.origin
		, destination	: req.body.destination
		, sd_time	: req.body.schedule_departure_time
		, sr_time	: req.body.schedule_return_time
		, comments	: req.body.comments
		});
	RouteLobuki.save(); */
	//display

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
console.log("2012 Compart.ir // Shareari.de");
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
