const mongoose = require('mongoose');
const { Schema } = mongoose;

const USER_SCHEMA = new Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		mutable: false
	},
	username: {
		type: String,
		required: false,
		unique: true,
		mutable: false
	},
	password: {
		type: String,
		required: true
	},
	photoURL: {
		type: String,
	},
	resume: {
		type: String
	}
}, { timestamps: true })


module.exports = mongoose.model("user", USER_SCHEMA);