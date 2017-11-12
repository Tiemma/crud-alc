var mongoose = require("mongoose")
var bcrypt = require("bcrypt-nodejs")
var Schema = mongoose.Schema


module.exports = function(){
	var studentSchema = new Schema({

		id: {
			type:String,
			unique:true,
			required: true
		},

		firstName: {
			type: String,
			required: true
		},

		lastName: {
			type: String,
			required: true
		},

		dept_id: {
			type: Schema.Types.ObjectId,
			required: true
		},

		cgpa: String,

		address: String,

		gender: {
			type: String,
			required: true
		},

		email: {
			type:String,
			unique:true
		},

		age: String,

		level: String,

		phone_no: {
			type:String,
			unique:true
		},

		courses: [{
			type: Schema.Types.ObjectId,
			ref: 'Courses'
		}],

		password: String
	})

	studentSchema.methods.generateHash = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	studentSchema.methods.validPassword = function(password) {
	    return bcrypt.compareSync(password, this.local.password);
	};

	return studentSchema
}
 

