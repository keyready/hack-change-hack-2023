import { Page } from 'widgets/Page/Page';
import { useCallback, useEffect, useState } from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import classes from './MainPage.module.scss';

interface Message {
    sender: string;
    body: string;
}

const MainPage = () => {
    useEffect(() => {
        document.title = 'Hack&Change 2023';
    }, []);

    const [socket, setSocket] = useState<WebSocket>(new WebSocket('ws://localhost:5000'));
    const [username, setUsername] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.onopen = () => {
            console.log('Подлкючение установлено');
            socket.send('привет сервер');
        };

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };
    }, [messages, socket]);

    const sendMessage = useCallback(() => {
        socket.send(username);
    }, [socket, username]);

    return (
        <Page>
            <Input value={username} onChange={setUsername} />
            <Button onClick={sendMessage}>Send</Button>

            <hr style={{ width: '100%', height: '2px', margin: '15px 0px' }} />

            {messages.length &&
                messages.map((message, index) => (
                    <div key={index} className={classes.messageCard}>
                        {message}
                    </div>
                ))}
        </Page>
    );
};

export default MainPage;
