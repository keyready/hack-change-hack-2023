import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Message, MessageCard } from 'entities/Message';
import { VStack } from 'shared/UI/Stack';
import classes from './UserChatDialogArea.module.scss';

interface UserChatDialogAreaProps {
    className?: string;
    messages: Message[];
}

export const UserChatDialogArea = memo((props: UserChatDialogAreaProps) => {
    const { className, messages } = props;

    return (
        <VStack
            maxW
            align="center"
            justify="end"
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
