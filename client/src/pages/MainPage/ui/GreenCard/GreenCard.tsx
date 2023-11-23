import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Icon } from 'shared/UI/Icon/Icon';
import TipTopIcon from 'shared/assets/icons/tiptop.svg';
import { AppLink } from 'shared/UI/AppLink';
import classes from './GreenCard.module.scss';

interface GreenCardProps {
    className?: string;
}

export const GreenCard = memo((props: GreenCardProps) => {
    const { className } = props;

    return (
        <VStack gap="8" maxW className={classNames(classes.GreenCard, {}, [className])}>
            <h3 className={classes.title}>
                Ещё выгоднее, если получаете зарплату или пенсию в Сбере
            </h3>
            <ul className={classes.list}>
                <li>
                    <HStack align="center" maxW gap="8">
                        <Icon Svg={TipTopIcon} className={classes.icon} />
                        <p>Ставка ниже обычной на 1%</p>
                    </HStack>
                </li>
                <li>
                    <HStack align="center" maxW gap="8">
                        <Icon Svg={TipTopIcon} className={classes.icon} />
                        <p>Для оформления кредита нужен только паспорт</p>
                    </HStack>
                </li>
            </ul>

            <AppLink to="#">
                <p className={classes.link}>Узнать больше о преимуществах</p>
            </AppLink>

            <img src="../../static/images/main-page-card-img.webp" alt="Сбер Карточка" />
        </VStack>
    );
});
