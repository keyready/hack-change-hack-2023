import { classNames } from 'shared/lib/classNames/classNames';
import { memo, UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Message, MessageCard } from 'entities/Message';
import { VStack } from 'shared/UI/Stack';
import { Skeleton } from 'primereact/skeleton';
import classes from './UserChatDialogArea.module.scss';

interface UserChatDialogAreaProps {
    className?: string;
    messages: Message[];
    isLoading?: boolean;
}

export const UserChatDialogArea = memo((props: UserChatDialogAreaProps) => {
    const { className, messages, isLoading } = props;

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

    const content = useMemo(() => {
        if (isLoading) {
            return (
                <VStack maxW gap="8">
                    {new Array(9).fill(0).map((_, index) => (
                        <Skeleton
                            key={index}
                            className={classNames(classes.leftSkeleton, {
                                [classes.rightSkeleton]: index % 2 === 0,
                                [classes.tallSkeleton]: index % 3 === 0,
                            })}
                            width="40%"
                            height="50px"
                        />
                    ))}
                </VStack>
            );
        }

        if (!isLoading && !messages.length) {
            return (
                <>
                    <h2>Ничего не найдено...</h2>
                </>
            );
        }
        return (
            <>
                {messages.map((message, index) => (
                    <MessageCard
                        className={classes.message}
                        message={message.body}
                        type={message.sender}
                        key={index}
                    />
                ))}
            </>
        );
    }, [isLoading, messages]);

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
            {content}
        </VStack>
    );
});
