import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import SberLogoIcon from 'shared/assets/icons/sber-logo.svg';
import SberIcon from 'shared/assets/icons/sber-btn-icon.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => (
    <HStack maxW justify="between" className={classNames(classes.Navbar, {}, [className])}>
        <Icon Svg={SberLogoIcon} />
        <Button className={classes.btn} variant="outlined">
            <HStack maxW gap="8">
                <Icon Svg={SberIcon} />
                <p className={classes.text}>Войти по Сбер ID</p>
            </HStack>
        </Button>
    </HStack>
));
