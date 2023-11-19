import { Page } from 'widgets/Page/Page';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { VStack } from 'shared/UI/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './MainPage.module.scss';

interface Message {
    type: 'connection' | 'message';
    username: string;
    message: string;
}

const MainPage = () => {
    useEffect(() => {
        document.title = 'Hack&Change 2023';
    }, []);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [socket, setSocket] = useState<WebSocket>(new WebSocket('ws://localhost:5000'));
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.onopen = () => {
            console.log('Подключение установлено');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'connection':
                    if (data.username === username) {
                        setIsConnected(true);
                    }
                    setMessages((prevState) => [data, ...prevState]);
                    break;

                case 'message':
                    setMessages((prev) => [data, ...prev]);
                    break;

                case 'disconnect':
                    setMessages((prevState) => [data, ...prevState]);
                    break;
            }
        };
    }, [messages, socket, username]);

    const sendMessage = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            socket.send(
                JSON.stringify({
                    type: 'message',
                    body: newMessage,
                    username,
                }),
            );
            setNewMessage('');
        },
        [newMessage, socket, username],
    );

    const makeConnection = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            socket.send(
                JSON.stringify({
                    type: 'connection',
                    username,
                    password,
                }),
            );
        },
        [password, socket, username],
    );

    if (!isConnected) {
        return (
            <VStack maxW>
                <form onSubmit={makeConnection}>
                    <Input value={username} onChange={setUsername} />
                    <Input value={password} onChange={setPassword} />
                    <Button type="submit">Войти</Button>
                </form>
            </VStack>
        );
    }

    return (
        <Page>
            <form onSubmit={sendMessage}>
                <Input value={newMessage} onChange={setNewMessage} />
                <Button type="submit">Отправить</Button>
            </form>

            <hr style={{ width: '100%', height: '2px', margin: '15px 0px' }} />

            <VStack maxW gap="16">
                {messages.length &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={classNames(classes.messageCard, {
                                [classes.ownMessage]: message.username === username,
                            })}
                        >
                            {message.username}@ {message.message}
                        </div>
                    ))}
            </VStack>
        </Page>
    );
};

export default MainPage;
