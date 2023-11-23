import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import MailInputIcon from 'shared/assets/icons/mail-input-icon.svg';
import PasswordInputIcon from 'shared/assets/icons/password-input-icon.svg';
import { MailInput } from 'widgets/MailInput';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AuthActions } from 'pages/AuthPage';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { sberIdLogin } from 'pages/AuthPage/model/services/sberIdLogin';
import { authLogin } from '../../model/services/authLogin';
import {
    getAuthEmail,
    getAuthError,
    getAuthPassword,
} from '../../model/selectors/getAuthSelectors';
import classes from './AuthForm.module.scss';

interface AuthFormProps {
    className?: string;
}

export const AuthForm = memo((props: AuthFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const email = useSelector(getAuthEmail);
    const password = useSelector(getAuthPassword);
    const authError = useSelector(getAuthError);

    const handleEmailChange = useCallback(
        (value: string) => {
            dispatch(AuthActions.setEmail(value));
        },
        [dispatch],
    );
    const handlePasswordChange = useCallback(
        (value: string) => {
            dispatch(AuthActions.setPassword(value));
        },
        [dispatch],
    );

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const result = await dispatch(authLogin({ email, password }));
        },
        [dispatch, email, password],
    );
    const handleSberLoginClick = useCallback(async () => {
        const result = await dispatch(sberIdLogin());

        if (result.meta.requestStatus === 'fulfilled') {
            console.log(result.payload);
        }
    }, [dispatch]);

    return (
        <VStack gap="32" maxW className={classNames(classes.AuthForm, {}, [className])}>
            <VStack maxW>
                <h1 className={classes.title}>
                    Привет, это <span>СберБанк!</span>
                </h1>
                <p>Для оформления заявки войдите одним из предложенных способов.</p>
            </VStack>

            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                <VStack maxW gap="16">
                    <VStack maxW gap="16">
                        <MailInput value={email} setValue={handleEmailChange} svg={MailInputIcon} />
                        <Input
                            svg={PasswordInputIcon}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Введите пароль"
                        />
                    </VStack>

                    <HStack maxW justify="end">
                        <p>Забыли пароль?</p>
                    </HStack>

                    <Button type="submit" className={classes.btn}>
                        Войти
                    </Button>
                </VStack>
            </form>

            <HStack maxW gap="8">
                <hr className={classes.hr} />
                <p>или</p>
                <hr className={classes.hr} />
            </HStack>

            <HStack maxW justify="center">
                <Button variant="sber" onClick={handleSberLoginClick}>
                    Войти по Сбер ID
                </Button>
            </HStack>

            {authError && (
                <HStack maxW justify="center">
                    <h2 className={classes.authError}>{authError}</h2>
                </HStack>
            )}
        </VStack>
    );
});
