// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const param = req.params.date;
  const time = !isNaN(param) ? param * 1000 : param;
  const date = new Date(time);
  console.log({ date });
  if (isNaN(date)) return res.json({ error: "Invalid Date" });
  const unix = Math.floor(date / 1000);
  const utc = date.toUTCString();
  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
// var listener = app.listen(52185, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
