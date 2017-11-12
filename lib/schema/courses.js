"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

module.exports = function () {

	var courseSchema = new Schema({
		id: {
			type: Schema.Types.ObjectId,
			required: true
		},

		name: {
			type: String,
			required: true
		},

		unit: {
			type: String,
			required: true
		},

		year: {
			type: String,
			required: true
		},

		department: [{
			type: Schema.Types.ObjectId
			//ref: 'Department'
		}]
	});

	return courseSchema;
};