import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import RightArrowIcon from 'shared/assets/icons/right-arrow.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import classes from './StepsBlock.module.scss';

interface StepsBlockProps {
    className?: string;
}

const Block = memo(({ children }: { children: ReactNode }) => (
    <div className={classes.block}>{children}</div>
));

export const StepsBlock = memo((props: StepsBlockProps) => {
    const { className } = props;

    return (
        <VStack
            maxW
            gap="32"
            align="center"
            className={classNames(classes.StepsBlock, {}, [className])}
        >
            <h1 className={classes.text}>Три шага к получению кредита</h1>

            <HStack maxW justify="between">
                <VStack className={classes.wrapper} gap="16" align="center">
                    <Block>1</Block>
                    <h3 className={classes.text}>Заполните анкету</h3>
                    <p className={classes.text}>
                        Подайте заявку в СберБанк Онлайн или обратитесь в ближайший офис банка.
                    </p>
                </VStack>

                <Icon Svg={RightArrowIcon} className={classes.icon} />

                <VStack className={classes.wrapper} gap="16" align="center">
                    <Block>2</Block>
                    <h3 className={classes.text}>Дождитесь одобрения</h3>
                    <p className={classes.text}>
                        Пришлём СМС, как только банк примет решение по заявке на кредит.
                    </p>
                </VStack>

                <Icon Svg={RightArrowIcon} className={classes.icon} />

                <VStack className={classes.wrapper} gap="16" align="center">
                    <Block>3</Block>
                    <h3 className={classes.text}>Получите деньги</h3>
                    <p className={classes.text}>
                        Деньги поступят на карту в течение 2 минут. Можете снимать наличные или
                        оплачивать покупки.
                    </p>
                </VStack>
            </HStack>
        </VStack>
    );
});
