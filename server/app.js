const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const createError   = require('http-errors');
const cookieParser  = require('cookie-parser');
const history       = require('connect-history-api-fallback');
const database      = require('./db');
const apiRouter     = require('./routes/api');

const app = express();
app.use(history());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Database connect
database();

// GET home page
app.use('/', express.static(path.join(__dirname, 'public')));


// 예를 들어 /api/animal 경로로 접속하면 :path?로 animal을 가로채서 아래 콜백 로직 진행하고
// next() 하면 리퀘스트가 넘어간다 app.use('/api'. apiRouter)로
// app.get('/api/:path?', function(req, res, next) {
//   console.log('admin contected.. admin path >> ' + req.params.path);
//   next();
// });
app.use('/api', apiRouter);

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
