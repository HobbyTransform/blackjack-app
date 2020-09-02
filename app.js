// create an express app
const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("static"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
var server = app.listen(process.env.PORT || 3000, () => {
	var port = server.address().port;
	console.log("App now running on port", port);
});
