var mongoose = require('../config/db')();
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var TagSchema = new Schema({
    id:{
        type:String,
        index: true
    },
	name:{
		type:String,
		unique: true,
        trim: true,
        required: true,
        index: true
    },
    key:{
        type:String,
        required:true,
    },
	status:{
		type:Number,
        default: 1
    },
	createdAt:{
		type:Date,
        default: Date.now
	},
	updatedAt:{
		type:Date
	}
}, { versionKey: false })

TagSchema.set('autoIndex', false);

// on every save, add the date
TagSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  next();
});

module.exports = mongoose.model('Tag', TagSchema);

