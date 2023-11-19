import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUsername } from 'entities/Chat';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    const username = useSelector(getUsername);

    if (!username) {
        return <Navigate to={RoutePath.main} />;
    }

    return children;
}
