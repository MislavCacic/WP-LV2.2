const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.redirect("/slike");
});

app.get("/slike", (req, res) => {
	fs.readFile(path.join(__dirname, "images.json"), "utf-8", (err, data) => {
		if (err) {
			return res.status(500).send("Error reading images data.");
		}

		const images = JSON.parse(data);

		res.render("slike", { images });
	});
});

app.listen(PORT, () => {
	console.log(`Server pokrenut na portu ${PORT}`);
});
