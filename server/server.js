const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

require('dotenv').config({
    path: './server/.env'
})
server.listen(port, () => {
    console.log(`server is UP in ${process.env.NODE_ENV}mode on port : ${port}...`);
});