"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
		type: Number,
		required: true,
		min: 0,
		max: 12
	},

	year: {
		type: Date,
		required: true
	},

	department: [{
		type: Schema.Types.ObjectId,
		ref: 'Department'
	}]
});

exports.default = courseSchema;