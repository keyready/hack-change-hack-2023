import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthEmail = (state: StateSchema) => state.authPage?.email || '';
export const getAuthPassword = (state: StateSchema) => state.authPage?.password || '';
export const getAuthError = (state: StateSchema) => state.authPage?.error || '';
