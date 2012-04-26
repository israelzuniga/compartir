function defineModels(mongoose, fn) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

	User = new Schema({
		'_id' : ObjectId,
	    'first_name': { type: String },
	    'last_name': { type: String },
	    'email': { type: String },
	    'member_since': { type:String, default: new Date().toISOString()  },
	    'avatar': { type: String },
		'phone': { type:String },
		'city':{ type:String },
		'address' : { type:String },
		'last_login' : { type:Date },
		'rides' : {type:Array}
	  });
	
	Ride = new Schema({
		'_id' : ObjectId,
		'from':{type:String},
		'to':{type:String},
		'route':{type:String},
		'created':{type:String},
		'when': { type:Array },
		'users': [User],
	})
	
}

exports.defineModels = defineModels;