const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const mongoose = require('mongoose');
const db = mongoose.connection;

require('dotenv').config({
    path: './server/.env'
})
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
    server.listen(port, () => {
        console.log(`server is UP in ${process.env.NODE_ENV}mode on port : ${port}...`);
    });
});

