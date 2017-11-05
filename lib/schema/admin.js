"use strict";

var bcrypt = require("bcrypt-nodejs");
var Schema = require('mongoose').Schema;

module.exports = function () {
	var adminSchema = new Schema({
		id: {
			type: Schema.Types.ObjectId,
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
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	});

	adminSchema.methods.generateHash = function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	// checking if password is valid
	adminSchema.methods.validPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	return adminSchema;
};