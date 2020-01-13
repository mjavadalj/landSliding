const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');

const mongoose = require('mongoose');
const db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/landsliding', { useNewUrlParser: true })
    .then(() => {
        console.log('database connected');
    })
    .catch(databaseConnectionError => {
        console.log('Unable to connect to the database :' + databaseConnectionError);
        return `Unable to connect to the database  : ${databaseConnectionError}`

    });
db.once('open', function () {

    app.use('/api', router);


});

module.exports = app;
