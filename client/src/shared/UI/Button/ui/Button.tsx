import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import SberBtnIcon from 'shared/assets/icons/sber-btn-icon.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { HStack } from 'shared/UI/Stack';
import { variantsMapper } from '../types/button.mapper';
import { buttonVariants } from '../types/button.types';
import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    variant?: buttonVariants;
}

export const Button = memo((props: ButtonProps) => {
    const { onClick, className, children, disabled, variant = 'primary', ...otherProps } = props;

    const add = [variantsMapper[variant], className];

    return (
        <button
            className={classNames(classes.Button, { [classes.disabled]: disabled }, add)}
            onClick={onClick}
            disabled={disabled}
            {...otherProps}
        >
            {variant === 'sber' ? (
                <HStack align="center" maxW gap="8" justify="center">
                    {variant === 'sber' && <Icon Svg={SberBtnIcon} />}
                    {children}
                </HStack>
            ) : (
                children
            )}
        </button>
    );
});
