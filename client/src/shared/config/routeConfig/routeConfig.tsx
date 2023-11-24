import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/common/NotFound';
import { AuthPage } from 'pages/AuthPage';
import { ConsultantPage } from 'pages/ConsultantPage';
import { UserRoles } from 'entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    requiredRoles?: UserRoles[];
};

export enum AppRoutes {
    MAIN = 'main',
    AUTH = 'auth',
    CONSULTANT = 'consultant',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.CONSULTANT]: '/consultant',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },
    [AppRoutes.CONSULTANT]: {
        path: RoutePath.consultant,
        element: <ConsultantPage />,
        authOnly: true,
        // requiredRoles: ['ADMIN', 'MODERATOR'],
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
