import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { Borrower } from '../types/Borrower';

interface SignupProps {
    email: string;
    password: string;
}

export const borrowerSignup = createAsyncThunk<Borrower, SignupProps, ThunkConfig<string>>(
    'Borrower/borrowerSignup',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        console.log('props', props);

        try {
            const response = await extra.api.post<Borrower>('/api/borrower_register', props);

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
