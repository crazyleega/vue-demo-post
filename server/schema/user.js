var mongoose = require('../config/db')();
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	id:{
		type:String,
		index: true
	},
	userName:{
		type:String,
		unique: true,
        trim: true,
        required: true,
        index: true
	},
	password:{
		type:String,
        required: true
    },
	createdAt:{
		type:Date,
        default: Date.now
	},
	updatedAt:{
		type:Date
	}
}, { versionKey: false })

UserSchema.set('autoIndex', false);

// on every save, add the date
UserSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  next();
});

module.exports = mongoose.model('User', UserSchema);

