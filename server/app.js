// libraries
const http = require("http");
const express = require("express");
const path = require("path");
const io = require("socket.io")(http);
const session = require('express-session');

// local dependencies
const db = require("./db");
const passport = require('./passport');
const api = require("./routes/api");

// initialize express app
const app = express();
const publicPath = path.resolve(__dirname, "..", "client", "dist");

app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: true
}))

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

app.get(["/profile", "/conversations", "/map",], (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/'); 
});

app.use('/api', api );
app.use(express.static(publicPath));

// port config
const port = 3000;
const server = http.Server(app);

server.listen(port, function() {
  console.log('Server running on port: ' + port);
});















// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});






