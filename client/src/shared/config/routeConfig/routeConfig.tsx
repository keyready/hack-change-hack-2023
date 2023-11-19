import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/common/NotFound';
import { ChatPage } from 'pages/ChatPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    loggedOutOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    CHAT = 'chat',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CHAT]: '/chat',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.CHAT]: {
        path: `${RoutePath.chat}/:roomId`,
        element: <ChatPage />,
        authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
