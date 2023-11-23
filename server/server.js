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
            'Authorization': `Bearer eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.P7UQkHP1cuHeiieOuwqL4Wd7UqMFGR9tESIHGwKrnKaWYKdHNTc-BqvUe9g4IfLJw_XsW0jdB7zXTdpQvaeIO1eMkeCkiwjT2p-drFxURHEmEK4P4o3_kVVWgWWMhWjsM1WljwQxWaQOlOht137rv1g2End9Lw2KUaXSgEsu-kJOrHo3A-OWfEJ_fcDX6yLkhJtubgEQfyZHq8MDgLsf9-f3s6vXeyZOU2RiEqLrztFHggYT4YSuEf-TjD1lGYF3nvO5mIIAbxvT418AkMS73qhKcKBfEYBroRkiT6XegFkbONTwPh5PmGg1rTS8OiRKWINZgeKGJWhNmrNlxr1kig.5hfCGdRTWpP9--2LktEkvQ.pci49DgNRy0sGg0XDHsjxuXgmRBrat3pckf4ULqKY9xae_hVyqLRslEcaZxKlg0H0t2SiS2rco_n5sVBnA1C62V5453dmHxcIkbcw59uOxedRhXSjWcJMoz5EptvbVmaSuWVzbBhE8GewLuIkDrfraKsgSZZ18JIsySb5yyfzLKB_Fmy4mUaMbFjwhEFi6NHDnpVhmMdBSMWow8EcvLs5Y_BBl2ejahMXgrwdZSYBaXsDa1bAtnCUHwnZX_SbZ9Fd3qxprJYpXck2YHRl1cuwLUqmXl0O-vPJk2KioVNi5POMFu5AoU3vTuQP3oECaYCAKoTT5-Fe09_LbTba7uhakwgUwqrciUAAvaKNCOCCl6orWx2c0V0ZHp7001ZKjMy5rePpGcVPKTY9wMWuC5N0NG8_CT8O0C6i0aCwSDQaKZEFQSCdu1SB-p4OTwge3qAig0xHDWvxJUxTv7q5Z6yclxTuO1INetJlo2djmRzk0sY3v1WN6cZuG49U4y98uiBYCtYyT6KbiwTSS0UG-b6nCqJhCTt7mTQ_uyREWWsmkmNy2RYrSjDFmhwWEB-Eh984L1BX5VHOgPIwRoulrDv-vy5LPqgnF_zIlJEMG6ocxpzvIn1vxDnpa2XPzM93g71v5DF4gt_Woj7QCQT_T-3AuMVOL0t8De88649yOno1hH1ofGZGBPL9wPiWwGPowCISgSWPVX0WAmC7IgF-O2qzO0ud-etSO1CHx0ulRlbagA.eQ1arqBv08Q48J5_VsB5XpZz18CE0Q5FiyDIxnoWKfs`,
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

                console.log(prompt, answer);

                ws.send(
                    JSON.stringify({
                        type: 'message',
                        sender: 'bot',
                        body: answer,
                    }),
                );

                //                 ws.send(
                //                     JSON.stringify({
                //                         type: 'message',
                //                         sender: 'bot',
                //                         body: `}`;
                // <p>Требования к заёмщику:</p>
                // <ul>
                // <li>Гражданин РФ</li>
                // <li>От 18 до 80 лет на момент полного погашения кредита</li>
                // <li>Стаж работы от 1 месяца или от 6 месяцев, если не получаете зарплату на карту СберБанка</li>
                // </ul>`,
                //                     }),
                //                 );
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
