"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
});

exports.default = departmentSchema;