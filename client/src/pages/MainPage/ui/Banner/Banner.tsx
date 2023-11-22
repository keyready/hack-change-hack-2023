import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import classes from './Banner.module.scss';

interface BannerProps {
    className?: string;
}

export const Banner = memo((props: BannerProps) => {
    const { className } = props;

    return (
        <HStack align="start" maxW className={classNames(classes.Banner, {}, [className])}>
            <VStack className={classes.wrapper} maxW gap="8" justify="between">
                <VStack maxW gap="16">
                    <h3>Кешбэк за кредит со СберПремьером</h3>
                    <p>
                        Подключите пакет услуг СберПремьер и получайте ежемесячный кешбэк — 2%
                        ставки <br /> по кредиту бонусами СберСпасибо
                    </p>
                </VStack>

                <Button className={classes.btn} variant="clear">
                    Условия акции
                </Button>
            </VStack>

            <img
                className={classes.img}
                src="../../static/images/main-page-sberkun-img.webp"
                alt="СберКун"
            />
        </HStack>
    );
});
