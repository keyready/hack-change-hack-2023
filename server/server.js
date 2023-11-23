const express = require('express');
const cors = require('cors');

const app = express();
const ws = require('express-ws')(app);

const aWss = ws.getWss();
app.use(
    cors({
        origin: '*',
    }),
);
app.use(express.json());

const broadcastMessaging = (message) => {
    aWss.clients.forEach((client) => {
        client.send(message);
    });
};

app.post('/api/login', (req, res) => {
    const { password } = req.body;

    if (password === '123') {
        return res.status(200).json({
            jwtToken: 'test',
        });
    }

    return res.status(403).json({
        message: 'Неверный пароль',
    });
});

app.get('/api/suggestion_card', async (req, res) =>
    res.status(200).json([
        { id: 1, title: 'Оформить кредит' },
        { id: 2, title: 'Причины отказа' },
        { id: 3, title: 'Статус заявки' },
        { id: 4, title: 'Документы' },
        { id: 5, title: 'Время обработки заявки' },
    ]),
);

app.ws('/chat', (ws, req) => {
    console.log('connected');
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
                switch (message) {
                }
                ws.send(
                    JSON.stringify({
                        type: 'message',
                        sender: 'bot',
                        body: `
<p>Требования к заёмщику:</p>
<ul>
<li>Гражданин РФ</li>
<li>От 18 до 80 лет на момент полного погашения кредита</li>
<li>Стаж работы от 1 месяца или от 6 месяцев, если не получаете зарплату на карту СберБанка</li>
</ul>`,
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
