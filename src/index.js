if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const app = require("./server.js");

app.listen(app.get("port"), () =>
	console.log(`Server is running on port ${app.get("port")}`)
);
