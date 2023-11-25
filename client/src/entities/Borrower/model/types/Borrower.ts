import { AffiliationType } from 'shared/types';

export interface Borrower {
    id: number;

    name: string;
    email: string;

    jwt: string;

    // поля, которые заполняются позже
    creditShortInfo?: {
        period: string;
        amount: number;
        interest_rate: number;
        status: string;
    };
    affiliation?: AffiliationType;
}
