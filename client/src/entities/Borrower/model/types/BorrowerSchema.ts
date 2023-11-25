import { Borrower } from './Borrower';

export interface BorrowerSchema {
    data?: Borrower;
    isLoading: boolean;
    error?: string;
}
