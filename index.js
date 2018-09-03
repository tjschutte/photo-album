const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ejs = require('ejs');

/**
 * Controllers (route handlers).
 */
const viewerController = require('./controllers/viewer');
const app = express();

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

// Route everything to the controller.
app.get('*', viewerController.main);

http.createServer(app).listen(80);

// Server is ready and running.
console.log('Express server listening');
module.exports = app;