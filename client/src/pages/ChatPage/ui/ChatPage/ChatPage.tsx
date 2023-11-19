import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { HStack, VStack } from 'shared/UI/Stack';
import { useParams } from 'react-router-dom';
import { Button } from 'shared/UI/Button';
import { Input } from 'shared/UI/Input';
import classes from './ChatPage.module.scss';

interface ChatPageProps {
    className?: string;
}

interface Message {
    type: 'connection' | 'message';
    username: string;
    message: string;
    room: string;
    createdAt: Date;
}

const ChatPage = memo((props: ChatPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'ChatPage';
    }, []);

    const { roomId } = useParams<string>();
    const [socketUrl] = useState('ws://localhost:5000');

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const { sendMessage, lastMessage: message } = useWebSocket(socketUrl);

    useEffect(() => {
        if (message !== null) {
            const data = JSON.parse(message.data) as Message;

            if (data.type === 'message' && data.room === roomId) {
                setMessages((prevState) => [data, ...prevState]);
            }
        }
    }, [message, roomId]);

    const handleSendMessage = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const message = JSON.stringify({
                type: 'message',
                room: roomId,
                username: 'user',
                message: newMessage,
                createdAt: new Date(),
            });
            sendMessage(message);
            setNewMessage('');
        },
        [newMessage, roomId, sendMessage],
    );

    return (
        <Page className={classNames(classes.ChatPage, {}, [className])}>
            <h1>Комната: {roomId} </h1>

            <VStack maxW gap="32">
                <HStack maxW gap="16">
                    <form onSubmit={handleSendMessage}>
                        <Input value={newMessage} onChange={setNewMessage} />
                        <Button type="submit">Отправить</Button>
                    </form>
                </HStack>

                <VStack maxW gap="32">
                    {messages.length &&
                        messages.map((message, index) => (
                            <div key={index} className={classes.messageCard}>
                                <HStack maxW justify="between">
                                    <p>
                                        {message.username}@ {message.message}
                                    </p>
                                    <p>{new Date(message.createdAt).toLocaleTimeString()}</p>
                                </HStack>
                            </div>
                        ))}
                </VStack>
            </VStack>
        </Page>
    );
});

export default ChatPage;
