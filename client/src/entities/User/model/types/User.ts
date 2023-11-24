import { UserRoles, CreditShort } from './UserIntefaces';

export interface User {
    id: number;
    name: string;
    role: UserRoles[];
    email: string;
    password: string;

    creditShortInfo: CreditShort;
}
