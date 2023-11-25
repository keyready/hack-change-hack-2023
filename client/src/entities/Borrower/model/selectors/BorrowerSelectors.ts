import { StateSchema } from 'app/providers/StoreProvider';

export const getBorrowerData = (state: StateSchema) => state.borrower?.data;
export const getBorrowerIsLoading = (state: StateSchema) => state.borrower?.isLoading;
export const getBorrowerError = (state: StateSchema) => state.borrower?.error;
