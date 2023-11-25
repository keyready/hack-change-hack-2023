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

const clients = {};

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

app.post('/api/underwriter_login', (req, res) => {
    const { password, email } = req.body;

    if (password === '123') {
        return res.status(200).json({
            id: 1,
            name: 'Корчак Р.Д.',
            email,
            affiliation: 'HIGH',
            jwt: 'test-jwt-for-underwriter',
        });
    }

    return res.status(403).json({
        message: 'Неверный пароль',
    });
});

app.post('/api/borrower_register', (req, res) => {
    const { password, email } = req.body;
    const ip = req.connection.remoteAddress;

    setTimeout(() => {
        if (clients[ip]) {
            clients[ip].send(
                JSON.stringify({
                    type: 'message',
                    sender: 'bot',
                    body: `<h3>Отлично! Почта успешно подтверждена!</h3>`,
                }),
            );
        }
        return res.status(200).json({
            jwt: 'ghbdtn vbh',
        });
    }, 1000);
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

app.ws('/ws/giga_chat', async (ws, req) => {
    console.log('connected');
    const ip = req.connection.remoteAddress;
    clients[ip] = ws;

    ws.on('message', async (event) => {
        const message = JSON.parse(event);

        switch (message.type) {
            case 'message':
                if (message.body === 'рега') {
                    ws.send(
                        JSON.stringify({
                            type: 'register_start',
                            sender: 'bot',
                            body: `<h3>${message.body}</h3>`,
                        }),
                    );
                    return;
                }

                ws.send(
                    JSON.stringify({
                        type: 'message',
                        sender: 'bot',
                        body: `<h3>${message.body}</h3>`,
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

app.ws('/ws/user_chat', async (ws, req) => {
    console.log('user chat connected');

    ws.on('message', async (event) => {
        ws.send(
            JSON.stringify({
                sender: 'bot',
                body: `<p>${JSON.parse(event).body}</p>`,
                type: 'message',
            }),
        );
    });
});

app.get('/api/fetch_borrowers', async (req, res) => {
    res.status(200).json([
        {
            id: 1,
            name: 'Иванов И.И.',
            creditShortInfo: {
                period: '3 года 6 месяцев',
                amount: 100000,
                interest_rate: 20.5,
                status: 'NEW_REQUEST',
            },
        },
        {
            id: 2,
            name: 'Петров П.П.',
            creditShortInfo: {
                period: '2 года 3 месяца',
                amount: 200000,
                interest_rate: 21.5,
                status: 'ACTIVE_REQUEST',
            },
        },
        {
            id: 3,
            name: 'Сидоров С.С.',
            creditShortInfo: {
                period: '1 год 1 месяц',
                amount: 300000,
                interest_rate: 22.5,
                status: 'ACCEPTED_REQUEST',
            },
        },
        {
            id: 4,
            name: 'Кузнецов К.К.',
            creditShortInfo: {
                period: '4 года 7 месяцев',
                amount: 400000,
                interest_rate: 23.5,
                status: 'REJECTED_REQUEST',
            },
        },
        {
            id: 5,
            name: 'Морозов М.М.',
            creditShortInfo: {
                period: '5 лет 2 месяца',
                amount: 500000,
                interest_rate: 24.5,
                status: 'NEW_REQUEST',
            },
        },
        {
            id: 6,
            name: 'Волков В.В.',
            creditShortInfo: {
                period: '6 лет 3 месяца',
                amount: 600000,
                interest_rate: 25.5,
                status: 'ACTIVE_REQUEST',
            },
        },
        {
            id: 7,
            name: 'Захаров З.З.',
            creditShortInfo: {
                period: '7 лет 4 месяца',
                amount: 700000,
                interest_rate: 26.5,
                status: 'ACCEPTED_REQUEST',
            },
        },
        {
            id: 8,
            name: 'Белов Б.Б.',
            creditShortInfo: {
                period: '8 лет 5 месяцев',
                amount: 800000,
                interest_rate: 27.5,
                status: 'REJECTED_REQUEST',
            },
        },
        {
            id: 9,
            name: 'Новиков Н.Н.',
            creditShortInfo: {
                period: '9 лет 6 месяцев',
                amount: 900000,
                interest_rate: 28.5,
                status: 'NEW_REQUEST',
            },
        },
        {
            id: 10,
            name: 'Тарасов Т.Т.',
            creditShortInfo: {
                period: '10 лет 7 месяцев',
                amount: 1000000,
                interest_rate: 29.5,
                status: 'ACTIVE_REQUEST',
            },
        },
    ]);
});

app.get('/api/fetch_borrower_chat/:id', async (req, res) => {
    const { id } = req.params;

    if (id !== -1) {
        const messages = [];

        for (let i = 0; i < id; i += 1) {
            messages.push(
                {
                    body: 'Привет, как дела?',
                    sender: 'user',
                },
                {
                    body: 'Все норм, спасибо',
                    sender: 'bot',
                },
            );
        }

        return res.status(200).json(messages);
    }
    return res.status(404);
});

app.listen(5000);
