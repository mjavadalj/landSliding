const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', router);


module.exports = app;
