// create an express app
var PORT = process.env.PORT || 3000;
const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("static"))

// define the first route
app.get("/status", function (req, res) {
  res.send("<h1>Success!</h1>")
})

// start the server listening for requests
var server = app.listen(PORT, () => {
	//var port = server.address().port;
	console.log("App now running on port", PORT);
});
