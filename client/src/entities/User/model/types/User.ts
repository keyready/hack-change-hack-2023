import { UserRoles } from './UserIntefaces';

export interface User {
    role: UserRoles[];
    email: string;
    password: string;
    name: string;
}
