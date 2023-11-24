import { Navigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getUserRole, UserRoles } from 'entities/User';
import { useMemo } from 'react';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRoles[];
}
export function RequireAuth({ children, roles }: RequireAuthProps) {
    const userRole = useSelector(getUserRole);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) return true;

        return roles.some((requiredRole) => userRole?.includes(requiredRole));
    }, [roles, userRole]);

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.main} />;
    }

    return children;
}
