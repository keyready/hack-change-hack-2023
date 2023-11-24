import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { UserActions } from 'entities/User';
import { LoginResult } from '../types/AuthSchema';

interface LoginProps {
    email: string;
    password: string;
}

export const authLogin = createAsyncThunk<LoginResult, LoginProps, ThunkConfig<ThunkError>>(
    'AuthPage/authLogin',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post<LoginResult>('/api/login', props);

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setUserRole(response.data.userRole));
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
