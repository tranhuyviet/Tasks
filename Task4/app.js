var express = require("express");
var app = express();
var http = require("http")
  .Server(app)
  .listen(80);
var upload = require("express-fileupload");
var fs = require("fs");
app.use(upload());
console.log("Server start!");
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/task_b.html");
});

app.post("/", function(req, res) {
  console.log(req.files);
  if (req.files) {
    var file = req.files.filename;
    var filename = file.name;
    file.mv("./upload/" + filename, function(err) {
      if (err) {
        console.log(err);
        res.send("error occured");
      } else {
        //res.send("Done!");
        //res.sendFile(__dirname + "/task_b.html");
        fs.ReadStream("./task_b.html").pipe(res);
      }
    });
  }
});
