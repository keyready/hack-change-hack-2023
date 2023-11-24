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

const sendMessage = async (messages) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const answer = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.hiCc3SCvumG5RTBnivfq-YOVLHq3DkdmpESFEV__74Q_HJU5s58xDXG3gmXuV6uveDSxI2HeiSzX_P8M-6qZ0WnMgmeQHrEw0Uif-TZPgL6wz403NzDBUurSAN_CY497Avj3ti7b0HwR3-LiC3XeSwPBB8d3qKAWHEZJIWTrpZ2jG54PP4FIT8o5b7YLJCqeYaKSUD3TfoVvNmfsbU3xJE0RcsAxO3d8wyDf9b4wfnoc5ZoKnecLYGX0Fd4y0S6iE6LTMfttMSpDKNkSseaPjoCioEwEGbggqiGX1iDsig77GGAMhNcE4ebR0dVpX4lh52wft6qR1fcDz4MNNBTVqA.-4_Xm27Xt5QG5U9Al5gUWQ.tWgG8oZQADFx8HdmNJ5aigmskme8oVnGbxAVwdhldmCrKrpduQXqahIdOORxKOhhdK4p2EPCuOQMxZOsk3XIn9f-Ud7RxuL_XVFIyxyV3twrwwvIySwuQxnaU-yIUr9AXtrM8rrb7w7gNViSP4VcC8yeElo2k-zjLZkGY1C8FrCNC286ngE7A535y3usDgD3yWADK6LOfJfexu744OrsDSx_2QrcA3_yCBvj95_avkpIds7p9u42elzygE9fA61wyRP1MPXp4blfwjWuXHCSVh2APN3HDX9DtRcpZvX8v9rUyUV2YAQqecMu2SUwjn4NqZI8JwNUevbxLVLAfgzw6YQqJ5NrIY8qzqiK5EjNo7IbFlJL81sZEHpM8AYU1exfBCRoqJsN2iIy1olCA4axmFrR2zqdKwpp5Kh0Mt7Do8vVk5J6TOrgac46NkMzErogF-VIdOMqkRn6wXJkUty2WnUfF6mHmXH06UylVGJWewud7hQ3Iqz2CKWCZEQM-4k5We4jEKaCgvAxobOcf5TAmJMz5S9LLdjlwIEN_snC9sIY9KSfiHa5EYM3vLqdZZiz_tXF--xjLU9roqxzMp3qwmNE-j3y5fmr7wMQImG0gIU4R4lygqnUFUavsF4bdyPf44iTsP-gR4-j5moZR06EvPU_3PX_05sGWFD9lAh-kiOqC-jnHN-PGDxqJVtZqg3xES7tB2XIgwPhQ7Bl8JagaBTM3HtaQIftXh7QwSy07uM.KpeZbsz61wc6hYJh7cvusmW67P-92GP1JrfBFKeULGg`,
            'rejectUnauthorized': false,
        },
        body: JSON.stringify({
            model: 'GigaChat:latest',
            messages,
            temperature: 0.7,
        }),
    });

    const jsonAnswer = await answer.json();
    return jsonAnswer.choices[0].message.content;
};

app.post('/api/login', (req, res) => {
    const { password } = req.body;

    if (password === '123') {
        return res.status(200).json({
            jwtToken: 'test',
            userRole: 'ADMIN',
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

app.ws('/chat', async (ws, req) => {
    console.log('connected');
    ws.on('message', async (event) => {
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
                const prompt =
                    `вот массив шаблонных фраз: ` +
                    `['причины отказа', 'какие ограничения', ` +
                    `'статус заявки', 'документы', 'время обработки заявки'].` +
                    `Твоя задача определять мое сообщение к какой-то из этих фраз. ` +
                    `В ответ на все следующие мои сообщения тебе надо ответить ` +
                    `шаблонной фразой, которая больше всего подходит по смыслу к тому,` +
                    `что написал я. ` +
                    `Мое сообщение: ${message.body}`;

                const answer = await sendMessage([{ role: 'user', content: prompt }]);

                ws.send(
                    JSON.stringify({
                        type: 'message',
                        sender: 'bot',
                        body: `<h3>${answer}</h3>`,
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
