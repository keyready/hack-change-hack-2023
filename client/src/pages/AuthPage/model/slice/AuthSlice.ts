import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import { UserCookieJWT } from 'shared/const';
import { authLogin } from '../services/authLogin';
import { AuthSchema, LoginResult } from '../types/AuthSchema';

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
            .addCase(authLogin.fulfilled, (state, action: PayloadAction<LoginResult>) => {
                state.isLoading = false;

                Cookie.set(UserCookieJWT, action.payload.jwtToken);

                state.jwtToken = action.payload.jwtToken;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    },
});

export const { actions: AuthActions } = AuthSlice;
export const { reducer: AuthReducer } = AuthSlice;
