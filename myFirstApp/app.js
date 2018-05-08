var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');  //设置你的favicon.ico
var logger = require('morgan'); // 项目运行打印日志
var cookieParser = require('cookie-parser');//解析cookie
var bodyParser = require('body-parser'); // 请求的body体


var index = require('./routes/index');
var users = require('./routes/users');
var download = require('./routes/download');
var purchase = require('./routes/purchase');
var register = require('./routes/register');
var reg2 = require('./routes/reg2');
var register_suc = require('./routes/register_suc');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//  加载中间件,实现某些功能
app.use(favicon(path.join(__dirname, 'public', 'logo.ico')));
app.use(logger(':method :url :status'));  // dev || :method :url :status
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由表
app.use('/', index);
app.use('/users', users);
app.use('/download', download);
app.use('/purchase', purchase);
app.use('/register', register);
app.use('/reg2', reg2);
app.use('/register_suc', register_suc);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

/*引入mongoose链接数据库*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('链接MongoDB数据库成功了 (*_*)！！！')
});