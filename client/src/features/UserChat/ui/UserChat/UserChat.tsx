import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { VStack } from 'shared/UI/Stack';
import { Message } from 'entities/Message';
import useWebSocket from 'react-use-websocket';
import { getUserData, User } from 'entities/User';
import { useBorrowerChat } from 'features/UserChat/api/fetchUserDialogApi';
import { useSelector } from 'react-redux';
import { UserChatDialogArea } from '../UserChatDialogArea/UserChatDialogArea';
import { UserChatHeader } from '../UserChatHeader/UserChatHeader';
import { UserChatMessageArea } from '../UserChatMessageArea/UserChatMessageArea';
import classes from './UserChat.module.scss';

interface UserChatProps {
    className?: string;
    user?: Partial<User>;
}

export const UserChat = memo((props: UserChatProps) => {
    const { className, user } = props;

    const userId = useSelector(getUserData)?.id;

    const { lastMessage, sendMessage } = useWebSocket('ws://localhost:5000/ws/user_chat');

    const { data: userMessages, isFetching: isUserMessagesLoading } = useBorrowerChat(
        user?.id || -1,
    );

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleAcceptRequest = useCallback(() => {}, []);
    const handleRejectRequest = useCallback(() => {}, []);
    const handleSendMessage = useCallback(() => {
        sendMessage(
            JSON.stringify({
                type: 'message',
                body: message,
                receiverId: user?.id || -1,
                senderId: userId,
                sender: 'user',
            }),
        );
        setMessages((prevState) => [...prevState, { body: message, sender: 'user' }]);
    }, [message, sendMessage, user?.id, userId]);

    useEffect(() => {
        if (lastMessage?.data) {
            setMessages((prevState) => [...prevState, JSON.parse(lastMessage.data)]);
        }
    }, [lastMessage]);

    useEffect(() => {
        if (userMessages?.length) setMessages(userMessages);
    }, [userMessages]);

    if (!user) {
        return (
            <VStack gap="0" maxW className={classNames(classes.UserChat, {}, [className])}>
                <h2>Выберите диалог, чтобы продолжить</h2>
            </VStack>
        );
    }

    return (
        <VStack gap="0" maxW className={classNames(classes.UserChat, {}, [className])}>
            <UserChatHeader
                name={user?.name || ''}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
            />
            <UserChatDialogArea isLoading={isUserMessagesLoading} messages={messages} />
            <UserChatMessageArea
                onMessageSent={handleSendMessage}
                value={message}
                onChange={setMessage}
            />
        </VStack>
    );
});
