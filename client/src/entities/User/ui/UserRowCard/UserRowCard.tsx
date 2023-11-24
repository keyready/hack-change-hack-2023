import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import CrossIcon from 'shared/assets/icons/red-cross.svg';
import GalkaIcon from 'shared/assets/icons/green-galka.svg';
import EmptyDialogIcon from 'shared/assets/icons/chat-icon.svg';
import FilledDialogIcon from 'shared/assets/icons/chat-filled-icon.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import { User } from 'entities/User';
import classes from './UserRowCard.module.scss';

interface UserRowCardProps {
    className?: string;
    user: Partial<User>;
    isSelected?: boolean;
    onChangeIsSelected: (user: Partial<User>) => void;
    isNewMessages?: boolean;
}

export const UserRowCard = memo((props: UserRowCardProps) => {
    const { className, isSelected, isNewMessages, user, onChangeIsSelected } = props;

    return (
        <div
            onClick={() => onChangeIsSelected(user)}
            className={classNames(classes.UserRowCard, { [classes.selectedRow]: isSelected }, [
                className,
            ])}
        >
            <p className={classes.name14px}>{user.name}</p>
            <p className={classes.text12px}>
                {user.creditShortInfo?.amount.toLocaleString('ru-RU')} ₽
            </p>
            <p className={classes.text12px}>{user.creditShortInfo?.period}</p>
            <p className={classes.text12px}>{user.creditShortInfo?.interest_rate} %</p>
            <Button variant="clear">
                <Icon Svg={CrossIcon} />
            </Button>
            <Button variant="clear">
                <Icon Svg={GalkaIcon} />
            </Button>
            <Button variant="clear">
                <Icon Svg={isNewMessages ? FilledDialogIcon : EmptyDialogIcon} />
            </Button>
        </div>
    );
});
