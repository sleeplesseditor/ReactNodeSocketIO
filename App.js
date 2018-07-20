const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const port = process.env.PORT || 4001;
const index = require('./routes/index');
const darksky = require('./config/keys').darkskyKey;

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server); 

//SocketIO setup
let interval;

io.on('connection', socket => {
    console.log('New client connected');
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 10000);
    socket.on('disconnect', () => {
        console.log('Client disconncted');
    });    
});

//Connection to DarkSky API
const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            `https://api.darksky.net/forecast/${darksky}/43.7695,11.2558`
        );
        socket.emit('FromAPI', res.data.currently.temperature);
    } catch (error) {
        console.log(`Error: ${error.code}`);
    }
};

server.listen(port, () => console.log(`Listening on Port ${port}`));