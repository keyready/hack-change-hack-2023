import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/UI/AppLink';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => (
    <HStack maxW justify="between" className={classNames(classes.Navbar, {}, [className])}>
        <AppLink to={RoutePath.main}>
            <h4>Навбар</h4>
        </AppLink>
    </HStack>
));
