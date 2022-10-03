require("dotenv").config();

const app = require("./server.js");

app.listen(app.get("port"), "0.0.0.0", () =>
	console.log(`Server is running on port ${app.get("port")}`)
);
