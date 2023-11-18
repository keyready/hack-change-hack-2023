import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    // FIXME сделать роутинг...
    // if (!auth) {
    //     return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    // }

    return children;
}
