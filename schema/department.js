var mongoose = require("mongoose")
var Schema = mongoose.Schema

module.exports = function(){

var departmentSchema = new Schema({
	id: {
		type: Schema.Types.ObjectId,
		required: true
	},
	name: {
		type: String, 
		required: true, 
		unique: true
	},
	shortcode: {
		type: String,
		required: true,
		unique: true
	}
})

return departmentSchema
}
