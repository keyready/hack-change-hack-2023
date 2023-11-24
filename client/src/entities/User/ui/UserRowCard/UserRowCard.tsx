import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import CrossIcon from 'shared/assets/icons/red-cross.svg';
import GalkaIcon from 'shared/assets/icons/green-galka.svg';
import EmptyDialogIcon from 'shared/assets/icons/chat-icon.svg';
import FilledDialogIcon from 'shared/assets/icons/chat-filled-icon.svg';

import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import classes from './UserRowCard.module.scss';

interface UserRowCardProps {
    className?: string;
    isSelected?: boolean;
    isNewMessages?: boolean;
}

export const UserRowCard = memo((props: UserRowCardProps) => {
    const { className, isSelected, isNewMessages } = props;

    return (
        <div
            className={classNames(classes.UserRowCard, { [classes.selectedRow]: isSelected }, [
                className,
            ])}
        >
            <p className={classes.name14px}>Низамидинов М.Ф.</p>
            <p className={classes.text12px}>{(30000000).toLocaleString('ru-RU')} ₽</p>
            <p className={classes.text12px}>10 лет 6 месяцев</p>
            <p className={classes.text12px}>47.8%</p>
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
