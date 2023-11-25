import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import classes from './BorrowerCard.module.scss';

interface BorrowerCardProps {
    className?: string;
}

export const BorrowerCard = memo((props: BorrowerCardProps) => {
    const { className } = props;

    return <div className={classNames(classes.BorrowerCard, {}, [className])}>BorrowerCard</div>;
});
