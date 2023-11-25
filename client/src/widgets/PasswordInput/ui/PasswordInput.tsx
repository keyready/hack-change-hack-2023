import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import classes from './PasswordInput.module.scss';

interface PasswordInputProps {
    className?: string;
}

export const PasswordInput = memo((props: PasswordInputProps) => {
    const { className } = props;

    const [value, setValue] = useState('');
    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Рекомендации к паролю</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Минимум одна буква в нижнем регистре</li>
                <li>Минимум одна буква в верхнем регистре</li>
                <li>Минимум одна цифра</li>
                <li>Минимум 8 символов</li>
                <li>Используйте специальные символы</li>
            </ul>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Password
                value={value}
                placeholder="Введите пароль"
                promptLabel="Введите пароль"
                weakLabel="Слабо ;("
                mediumLabel="Пойдет, но можно лучше"
                strongLabel="Отлично ;)"
                onChange={(e) => setValue(e.target.value)}
                header={header}
                footer={footer}
            />
        </div>
    );
});
