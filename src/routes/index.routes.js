const { Router } = require("express");
const router = Router();
const Photo = require("../models/Photo");
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const fs = require("fs-extra");

router.get("/", async (req, res) => {
	const photos = await Photo.find({}).lean();

	res.render("images", { photos });
});

router.get("/manage", async (req, res) => {
	const photos = await Photo.find({}).lean();

	res.render("manage-images", { photos });
});

router.post("/add", async (req, res) => {
	const { title, description } = req.body;
	const { path } = req.file;

	// Save image to Cloudinary
	const result = await cloudinary.v2.uploader.upload(path, {
		folder: "gallery-photos",
	});

	const { public_id, url } = result;

	// Save to DB
	const newPhoto = new Photo({
		title,
		description,
		imgURL: url,
		public_id,
	});
	await newPhoto.save();

	// Delete the file image from local server
	await fs.unlink(path);

	res.redirect("/manage");
});

router.get("/image/delete", async (req, res) => {
	// Route: /image/delete?id=xx
	const photo = await Photo.findByIdAndDelete(req.query.id);

	// Delete image from Cloudinary
	await cloudinary.v2.uploader.destroy(photo.public_id);
	res.redirect("/manage");
});

module.exports = router;
