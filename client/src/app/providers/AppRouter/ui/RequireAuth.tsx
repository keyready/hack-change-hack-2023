import { Navigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    if (!false) {
        return <Navigate to={RoutePath.main} />;
    }

    return children;
}
