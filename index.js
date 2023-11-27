// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// app.use(express.json);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  // res.send("Hi there");
  res.sendFile(__dirname + "/views/index.html");
});

// // your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get("/api/:date?", function (req, res) {
  const params = req.params;
  console.log("params: ", params);
  let date = new Date();
  const dateParam = params.date;
  if (dateParam) {
    try {
      const num = Number(dateParam);
      date = num ? new Date(num) : new Date(dateParam);
    } catch {
      res.status(400).json({ error: "Invalid Date" });
    }
  }

  res.status(200).json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app;
