import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { VStack } from 'shared/UI/Stack';
import { AppLink } from 'shared/UI/AppLink';
import classes from './NotFound.module.scss';

interface NotFoundProps {
    className?: string;
}

export const NotFound = ({ className }: NotFoundProps) => {
    useEffect(() => {
        document.title = '404 | Не найдено';
    }, []);

    return (
        <Page className={classNames(classes.NotFound, {}, [className])}>
            <VStack maxW align="center" justify="center">
                <img src="./static/images/404.webp" alt="" />
                <h1 className={classes.t404}>404</h1>
                <h2 className={classes.te404}>страница не найдена</h2>
                <p>Страница, на которую вы пытаетесь попасть, не существует или была удалена</p>
            </VStack>
        </Page>
    );
};
