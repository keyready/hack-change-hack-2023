import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import classes from './UserChat.module.scss';

interface UserChatProps {
    className?: string;
}

export const UserChat = memo((props: UserChatProps) => {
    const { className } = props;

    return (
        <HStack maxW className={classNames(classes.UserChat, {}, [className])}>
            <h1>тут будет чат с клиентом</h1>
        </HStack>
    );
});
