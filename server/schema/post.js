var mongoose = require('../config/db')();
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var PostSchema = new Schema({
	id:{
		type:String,
		unique: true,
		index: true
	},
	userId:{
		type:String,
        required: true
	},
	title:{
		type:String,
        required: true
    },
	content:{
		type:String,
        required: true
	},
	tags:{
		type:[String],
		required: true,
		default:[]
	},
	status:{
		type:Number,
		default: 1
	},
	views:{
		type:Number,
		default: 0
	},
	comments:{
		type:Number,
		default: 0
	},
	createdAt:{
		type:Date,
        default: Date.now
	},
	updatedAt:{
		type:Date
	}
}, { versionKey: false })

PostSchema.set('autoIndex', false);

// on every save, add the date
PostSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  next();
});

module.exports = mongoose.model('Post', PostSchema);

