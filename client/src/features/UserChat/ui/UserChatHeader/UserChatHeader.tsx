import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import classes from './UserChatHeader.module.scss';

interface UserChatHeaderProps {
    className?: string;
    name: string;
    onReject: () => void;
    onAccept: () => void;
    onDocumentClick?: () => void;
}

export const UserChatHeader = memo((props: UserChatHeaderProps) => {
    const { className, name, onAccept, onReject, onDocumentClick } = props;

    return (
        <HStack
            justify="between"
            maxW
            className={classNames(classes.UserChatHeader, {}, [className])}
        >
            <h3 className={classes.title}>{name}</h3>

            <HStack>
                <Button onClick={onDocumentClick} className={classes.outlinedButton}>
                    <p>Документы</p>
                </Button>

                <Button
                    onClick={onAccept}
                    className={classNames(classes.acceptButton, {}, [classes.button])}
                >
                    <HStack maxW>
                        <CheckIcon className={classes.acceptIcon} />
                        <p>Одобрить</p>
                    </HStack>
                </Button>

                <Button
                    onClick={onReject}
                    className={classNames(classes.rejectButton, {}, [classes.button])}
                >
                    <HStack maxW>
                        <Cross2Icon className={classes.rejectIcon} />
                        <p>Отказать</p>
                    </HStack>
                </Button>
            </HStack>
        </HStack>
    );
});
