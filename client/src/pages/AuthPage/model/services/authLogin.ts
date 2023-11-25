import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkError } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { User, UserActions } from 'entities/User';

interface LoginProps {
    email: string;
    password: string;
}

export const authLogin = createAsyncThunk<User, LoginProps, ThunkConfig<ThunkError>>(
    'AuthPage/authLogin',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/api/underwriter_login', props);

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setUserData(response.data));
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    },
);
