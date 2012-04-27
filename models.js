
var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;
	
var rideSchema = new Schema({
	nride: ObjectId,
	type_u: String,
	origin: String,
	destination: String,
	schedule_departure_time: String,
	schedule_return_time: String, 
	comments: String
});

module.exports = mongoose.model('Ride', rideSchema);

