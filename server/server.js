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

        switch (message.type) {
            case 'connection':
                broadcastMessaging(
                    JSON.stringify({
                        room: message.room,
                        username: 'system',
                        type: 'connection',
                        message: `Пользователь ${message.username} подключился`,
                        createdAt: new Date(),
                    }),
                );
                break;

            case 'message':
                broadcastMessaging(
                    JSON.stringify({
                        username: message.username,
                        message: message.message,
                        room: message.room,
                        createdAt: message.createdAt,
                        type: 'message',
                    }),
                );
                break;
        }
    });

    ws.on('close', (event) => {
        broadcastMessaging(
            JSON.stringify({
                type: 'disconnection',
                username: 'system',
                message: `Пользователь вышел из чата`,
            }),
        );
    });
});

app.listen(5000);
