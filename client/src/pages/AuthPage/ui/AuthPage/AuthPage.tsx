import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { HStack } from 'shared/UI/Stack';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { AuthReducer } from '../../model/slice/AuthSlice';
import classes from './AuthPage.module.scss';
import { AuthForm } from '../AuthForm/AuthForm';

interface AuthPageProps {
    className?: string;
}

const AuthPage = memo((props: AuthPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Авторизация';
    }, []);

    return (
        <DynamicModuleLoader reducers={{ authPage: AuthReducer }}>
            <Page className={classNames(classes.AuthPage, {}, [className])}>
                <HStack className={classes.wrapper} maxW gap="0" justify="between">
                    <AuthForm />
                    <div className={classes.img} />
                </HStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default AuthPage;
