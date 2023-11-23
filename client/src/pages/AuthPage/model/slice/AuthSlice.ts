import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authLogin } from 'pages/AuthPage/model/services/authLogin';
import Cookie from 'js-cookie';
import { UserCookieJWT } from 'shared/const';
import { AuthSchema } from '../types/AuthSchema';

const initialState: AuthSchema = {
    email: '',
    password: '',
    isLoading: false,
};

export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(authLogin.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;

                Cookie.set(UserCookieJWT, action.payload);

                state.jwtToken = action.payload;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    },
});

export const { actions: AuthActions } = AuthSlice;
export const { reducer: AuthReducer } = AuthSlice;
