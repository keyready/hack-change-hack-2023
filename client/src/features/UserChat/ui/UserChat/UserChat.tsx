import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { VStack } from 'shared/UI/Stack';
import { Message } from 'entities/Message';
import useWebSocket from 'react-use-websocket';
import { UserChatDialogArea } from '../UserChatDialogArea/UserChatDialogArea';
import { UserChatHeader } from '../UserChatHeader/UserChatHeader';
import { UserChatMessageArea } from '../UserChatMessageArea/UserChatMessageArea';
import classes from './UserChat.module.scss';

interface UserChatProps {
    className?: string;
}

export const UserChat = memo((props: UserChatProps) => {
    const { className } = props;

    const { lastMessage, sendMessage } = useWebSocket('ws://localhost:5000/ws/user_chat');

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleAcceptRequest = useCallback(() => {}, []);
    const handleRejectRequest = useCallback(() => {}, []);
    const handleSendMessage = useCallback(() => {
        sendMessage(
            JSON.stringify({
                type: 'message',
                body: message,
                sender: 'user',
            }),
        );
        setMessages((prevState) => [...prevState, { body: message, sender: 'user' }]);
    }, [lastMessage, message, sendMessage]);

    useEffect(() => {
        if (lastMessage?.data) {
            setMessages((prevState) => [...prevState, JSON.parse(lastMessage.data)]);
        }
    }, [lastMessage]);

    return (
        <VStack gap="0" maxW className={classNames(classes.UserChat, {}, [className])}>
            <UserChatHeader
                name="Низамидинов М.Ф."
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
            />
            <UserChatDialogArea messages={messages} />
            <UserChatMessageArea
                onMessageSent={handleSendMessage}
                value={message}
                onChange={setMessage}
            />
        </VStack>
    );
});
