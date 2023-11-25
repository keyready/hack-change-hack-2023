import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { Icon } from 'shared/UI/Icon/Icon';
import { HStack } from 'shared/UI/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    autoFocus?: boolean;
    readonly?: boolean;
    onChange?: (value: string) => void;
    svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Input = memo((props: InputProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const { svg, value, onChange, type = 'text', autoFocus, readonly, ...otherProps } = props;

    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        if (autoFocus) {
            ref.current?.focus();
        }
    }, [autoFocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <HStack
            maxW
            className={classNames(classes.InputWrapper, {
                [classes.focusedWrapper]: isFocused,
            })}
        >
            {svg && <Icon className={classes.icon} Svg={svg} />}
            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={ref}
                value={value || ''}
                onChange={onChangeHandler}
                className={classes.Input}
                type={type}
                readOnly={readonly}
                {...otherProps}
            />
        </HStack>
    );
});
