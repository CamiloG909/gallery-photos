const { Schema, model } = require("mongoose");

const Photo = new Schema(
	{
		title: String,
		description: String,
		imgURL: String,
		public_id: String,
	},
	{
		collection: "gallery-photos",
	}
);

module.exports = model("Photo", Photo);
