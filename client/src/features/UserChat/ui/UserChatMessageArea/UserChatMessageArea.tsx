import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Icon } from 'shared/UI/Icon/Icon';
import SendMessageIcon from 'shared/assets/icons/send-icon.svg';
import { Button } from 'shared/UI/Button';
import classes from './UserChatMessageArea.module.scss';

interface UserChatMessageAreaProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    onMessageSent: () => void;
}

export const UserChatMessageArea = memo((props: UserChatMessageAreaProps) => {
    const { className, value, onChange, onMessageSent } = props;

    const handleInputValueChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
        },
        [onChange],
    );
    const handleSendMessage = useCallback(() => {
        onMessageSent();
        onChange('');
    }, [onChange, onMessageSent]);

    const handleEnterClick = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onMessageSent();
                onChange('');
            }
        },
        [onChange, onMessageSent],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleEnterClick);
        return () => document.removeEventListener('keydown', handleEnterClick);
    }, [handleEnterClick]);

    return (
        <HStack maxW className={classNames(classes.UserChatMessageArea, {}, [className])}>
            <input
                className={classes.input}
                placeholder="Введите сообщение..."
                value={value}
                onChange={handleInputValueChange}
            />
            <Button variant="clear" onClick={handleSendMessage}>
                <Icon Svg={SendMessageIcon} />
            </Button>
        </HStack>
    );
});
