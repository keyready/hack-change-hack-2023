import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import classes from './PurpleCard.module.scss';

interface PurpleCardProps {
    className?: string;
}

export const PurpleCard = memo((props: PurpleCardProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.PurpleCard, {}, [className])}>
            <VStack justify="between" maxW gap="8"
className={classes.textBlock}>
                <VStack maxW gap="8">
                    <h3 className={classes.title}>
                        Бонусы за кредит подписчикам <br /> СберПрайм+
                    </h3>
                    <p>
                        Оформите кредит и получайте каждый месяц 2% ставки бонусами СберСпасибо,
                        пока действует ваша подписка СберПрайм+
                    </p>
                </VStack>

                <HStack maxW gap="8" className={classes.btnWrapper}>
                    <Button className={classes.button}>Оформить онлайн</Button>
                    <Button className={classes.button} variant="clear">
                        Правила акции
                    </Button>
                </HStack>
            </VStack>

            <img
                className={classes.img}
                src="../../static/images/main-page-prime-img.webp"
                alt="Сбер Парйм+"
            />
        </div>
    );
});
