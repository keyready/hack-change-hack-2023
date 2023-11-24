import { classNames } from 'shared/lib/classNames/classNames';
import { memo, UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Message, MessageCard } from 'entities/Message';
import { VStack } from 'shared/UI/Stack';
import classes from './UserChatDialogArea.module.scss';

interface UserChatDialogAreaProps {
    className?: string;
    messages: Message[];
}

export const UserChatDialogArea = memo((props: UserChatDialogAreaProps) => {
    const { className, messages } = props;

    const messagesArea = document.querySelector('#chatMessagesArea');

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesArea) {
            messagesArea.scrollTo(0, messagesArea.scrollHeight);
        }
    }, [messages, messagesArea]);

    // TODO: сделать появляющуюся кнопку "вниз" при скролле окна диалога
    const handleChatScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
        const currentScrollPosition = scrollRef.current?.scrollTop || 0;
        const scrollHeight = scrollRef.current?.scrollHeight || 0;
        const clientHeight = scrollRef.current?.clientHeight || 0;

        if (scrollHeight - currentScrollPosition <= clientHeight + 200) {
            console.log('скролл');
        }
    }, []);

    return (
        <VStack
            maxW
            align="center"
            justify="start"
            ref={scrollRef}
            id="chatMessagesArea"
            onScroll={handleChatScroll}
            className={classNames(classes.UserChatDialogArea, {}, [className])}
            gap="16"
        >
            {messages.length ? (
                messages.map((message, index) => (
                    <MessageCard
                        className={classes.message}
                        message={message.body}
                        type={message.sender}
                        key={index}
                    />
                ))
            ) : (
                <VStack maxW justify="center" align="center">
                    <h3>Тут пока ничего нет...</h3>
                    <p>Начните диалог!</p>
                </VStack>
            )}
        </VStack>
    );
});
