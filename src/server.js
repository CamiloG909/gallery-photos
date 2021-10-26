const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const exphbs = require("express-handlebars");

require("./database");

// Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
	".hbs",
	exphbs({
		defaultLayout: "default",
		layoutsDir: path.join(app.get("views")),
		partialsDir: path.join(app.get("views"), "partials"),
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
	destination: path.join(__dirname, "public/uploads"),
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + path.extname(file.originalname));
	},
});
app.use(
	multer({
		storage,
	}).single("image")
);

// Routes
app.use(require("./routes/index.routes"));

// Static files
app.use(express.static(path.resolve(__dirname, "./public")));

module.exports = app;
