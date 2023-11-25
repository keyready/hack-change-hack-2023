import { StateSchema } from 'app/providers/StoreProvider';

export const getUnderwriterData = (state: StateSchema) => state.underwriter?.data;
export const getUnderwriterIsLoading = (state: StateSchema) => state.underwriter?.isLoading;
export const getUnderwriterError = (state: StateSchema) => state.underwriter?.error;
