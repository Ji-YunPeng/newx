var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require("multer")
var cors  = require("cors")




var app = express();

var cookieSession = require("cookie-session")

app.use(cookieSession({
  name:"shop",
  keys: ['key1', 'key2'],
  maxAge:1000 * 60 * 60 * 24
}))

// app.use(cors({
//   "origin": ['http://localhost:8080'],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders:['Content-Type', 'Authorization']
// }));

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    if(req.url.indexOf("user")!==-1||req.url.indexOf("reg")!==-1){
      cb(null,path.join(__dirname,"public/upload/user"))
    }else if(req.url.indexOf("banner")!==-1){
      cb(null,path.join(__dirname,"public/upload/banner"))
    }else{
      cb(null,path.join(__dirname,"public/upload/product"))
    }
  }
})
var multerObj = multer({storage})
app.use(multerObj.any())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public/template')));
app.use("/admin",express.static(path.join(__dirname, 'public/admin')));
app.use(express.static(path.join(__dirname, 'public')));

app.all("/api/*",require("./routes/api/params"));
// app.use('/api/banner',require('./routes/api/banner'));
app.use('/api/login',require('./routes/api/login'));
app.use('/api/buycarc',require('./routes/api/buycarc'));
app.use('/api/buycarg',require('./routes/api/buycarg'));
app.use('/api/buycars',require('./routes/api/buycars'));
app.use('/api/logout',require('./routes/api/logout'));
app.use('/api/:product',require('./routes/api/product'));
app.use('/api/reg',require('./routes/api/reg'));
app.use('/api/user',require('./routes/api/user'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
