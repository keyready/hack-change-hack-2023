import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { Underwriter } from '../types/Underwriter';

interface loginProps {
    email: string;
    password: string;
}

export const underwriterLogin = createAsyncThunk<Underwriter, loginProps, ThunkConfig<string>>(
    'Underwriter/underwriterLogin',
    async (loginProps, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<Underwriter>(
                '/api/underwriter_login',
                loginProps,
            );

            if (!response.data) {
                throw new Error();
            }

            Cookie.set('token', response.data.jwt);

            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError;
            return rejectWithValue(axiosError.message);
        }
    },
);
