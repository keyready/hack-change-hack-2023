import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Parser } from 'html-to-react';
import classes from './MessageCard.module.scss';

interface MessageCardProps {
    className?: string;
    message: string;
    type: 'bot' | 'user';
}

export const MessageCard = memo((props: MessageCardProps) => {
    const { className, message, type } = props;

    return (
        <div
            className={classNames(classes.MessageCard, { [classes.botMessage]: type === 'bot' }, [
                className,
            ])}
        >
            {type === 'user' ? <p className={classes.text}>{message}</p> : Parser().parse(message)}
        </div>
    );
});
