import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './PopularQueryCard.module.scss';

interface PopularQueryCardProps {
    className?: string;
    title: string;
    onClick: (title: string) => void;
}

export const PopularQueryCard = memo((props: PopularQueryCardProps) => {
    const { className, title, onClick } = props;

    return (
        <p
            onClick={() => onClick(title)}
            className={classNames(classes.PopularQueryCard, {}, [className])}
        >
            {title}
        </p>
    );
});
