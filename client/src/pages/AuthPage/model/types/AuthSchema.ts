import { UserRoles } from 'entities/User';

export interface AuthSchema {
    email: string;
    password: string;
    error?: string;
    isLoading: boolean;
    jwtToken?: string;
}

export interface LoginResult {
    jwtToken: string;
    userRole: UserRoles[];
}
