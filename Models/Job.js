const mongoose = require('mongoose');
const { Schema } = mongoose;

const JOB_SCHEMA = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	isAvailable: {
		type: Boolean,
		required: true,
		default: true
	},
	creatorID: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "user"
	},
}, { timestamps: true })


module.exports = mongoose.model("job", JOB_SCHEMA);