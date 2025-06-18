require('dotenv').config();


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var homeRouter = require('./routes/home');
var favoritosRouter = require('./routes/favoritos');
var perfilUsuarioRouter = require('./routes/perfil_usuario');
var pesquisarRouter = require('./routes/pesquisar');
var propostaRouter = require('./routes/proposta');
var usersRouter = require('./routes/users');
var cadastro_loginRouter = require('./routes/cadastro_login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.locals.session = req.session || null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRouter);
app.use('/favoritos', favoritosRouter);
app.use('/perfil_usuario', perfilUsuarioRouter);
app.use('/pesquisar', pesquisarRouter);
app.use('/proposta', propostaRouter);
app.use('/users', usersRouter);
app.use('/', cadastro_loginRouter);

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
