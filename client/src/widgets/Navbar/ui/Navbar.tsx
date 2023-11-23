import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import SberLogoIcon from 'shared/assets/icons/sber-logo.svg';
import SberIcon from 'shared/assets/icons/sber-btn-icon.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/UI/AppLink';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}


export const Navbar = memo(({ className }: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <HStack maxW justify="between" className={classNames(classes.Navbar, {}, [className])}>
            <AppLink to={RoutePath.main}>
                <Icon Svg={SberLogoIcon} />
            </AppLink>

            <Button
                onClick={() => navigate(RoutePath.auth)}
                className={classes.btn}
                variant="outlined"
            >
                <HStack maxW gap="8">
                    <Icon Svg={SberIcon} />
                    <p className={classes.text}>Войти по Сбер ID</p>
                </HStack>
            </Button>
        </HStack>
    );
});
