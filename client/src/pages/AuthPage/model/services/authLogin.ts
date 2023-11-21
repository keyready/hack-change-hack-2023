import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

interface LoginProps {
    email: string;
    password: string;
}

export const authLogin = createAsyncThunk<string, LoginProps, ThunkConfig<ThunkError>>(
    'AuthPage/authLogin',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/login', props);

            if (!response.data) {
                throw new Error();
            }

            // @ts-ignore
            return response.data.jwtToken;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
