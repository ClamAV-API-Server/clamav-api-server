const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/config/api.dev.env` })

const express = require('express');
const expressFileUpload = require('express-fileupload');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(expressFileUpload({
    useTempFiles: true
}))

app.use((req, res, next) => {
    req.io = io;
    next();
})

const { ApiController } = require('./controllers/ApiController');

const api = new ApiController();

app.get('/', api.home);
app.get('/scan', api.urlScan);
app.post('/scan', api.fileScan);


http.listen(process.env.SERVER_PORT, () => {
    console.log(`ClamAV API Running on ${process.env.SERVER_PORT}`)
})