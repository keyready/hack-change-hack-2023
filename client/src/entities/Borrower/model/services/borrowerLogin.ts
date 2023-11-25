import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { Borrower } from '../types/Borrower';

interface BorrowerLoginProps {
    email: string;
    password: string;
}

export const borrowerLogin = createAsyncThunk<Borrower, BorrowerLoginProps, ThunkConfig<string>>(
    'Borrower/borrowerLogin',
    async (loginProps, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<Borrower>(
                '/api/login_borrower_login',
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
