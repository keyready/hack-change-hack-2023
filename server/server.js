const express = require('express');

const app = express();
const ws = require('express-ws')(app);

const aWss = ws.getWss();

const broadcastMessaging = (message) => {
    aWss.clients.forEach((client) => {
        client.send(message);
    });
};

app.ws('/', (ws, req) => {
    ws.on('message', (event) => {
        const message = JSON.parse(event);

        console.log(message);

        switch (message.type) {
            case 'connection':
                broadcastMessaging(
                    JSON.stringify({
                        username: message.username,
                        type: 'connection',
                        message: `Пользователь ${message.username} подключился`,
                    }),
                );
                break;

            case 'message':
                broadcastMessaging(
                    JSON.stringify({
                        username: message.username,
                        message: message.body,
                        type: 'message',
                    }),
                );
                break;
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
        broadcastMessaging(
            JSON.stringify({
                type: 'disconnect',
                username: 'message.username',
                message: `Пользователь вышел из чата`,
            }),
        );
    });
});

app.listen(5000);
