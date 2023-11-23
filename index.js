process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

fetch('https://oauth.sber.ru/ru/prod/tokens/v2/oidc', {
    method: 'post',
    headers: {
        'accept': 'application/json',
        'rquid': '012345678901234567890123456789FF',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: '393e1145-db57-4385-8efe-e6ca260ecba6',
        client_secret: '377b76b3-0aea-4ffd-8fc5-56209f270216',
        redirect_uri: 'http://localhost:3000/',
    }),
})
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
    });
