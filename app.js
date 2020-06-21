var express = require("express");
var util = require("./data/helper");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");


var indexRouter = require("./routes/index");
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());


  app.use("/", indexRouter);

  // catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  
  util.connectToDb(err => {
    console.log("now connected to db");
  });
  
  app.listen(5000, () => {
    console.log(`running port ${5000}`);
  });
  
  module.exports = app;