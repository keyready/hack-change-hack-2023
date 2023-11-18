const express = require('express');

const app = express();
const ws = require('express-ws')(app);

app.ws('/', (ws, req) => {
    console.log('WebSocket connection opened');

    ws.on('message', (event) => {
        console.log(event);
        ws.send(event);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

app.listen(5000);
