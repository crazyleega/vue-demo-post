var mongoose = require('../config/db')();
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
	id:{
		type:String,
		unique: true,
		index: true
	},
	from:{
		type:String,
        required: true
	},
	content:{
		type:String,
        required: true
    },
    type:{
        //评论类型 1: 普通评论 2：转发
        type:Number,
        required: true
    },
	parent_id:{
		type:String,
        required: true
	},
	like:{
		type:[String],
		default:[]
	},
	unlike:{
		type:[String],
		default: []
	},
	total_like:{
		type:Number,
		default: 0
    },
    total_unlike:{
		type:Number,
		default: 0
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
	},
	userInfo:{
		type: Object
	}
}, { versionKey: false })

CommentSchema.set('autoIndex', false);

// on every save, add the date
CommentSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);

