import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sberIdLogin } from '../services/sberIdLogin';
import { User } from '../types/User';
import { UserSchema } from '../types/UserSchema';
import { fetchUser } from '../services/fetchUser';
import { UserRoles } from '../types/UserIntefaces';

const initialState: UserSchema = {
    data: {} as User,
    isLoading: false,
    error: undefined,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setUserRole: (state, action: PayloadAction<UserRoles[]>) => {
            state.data.role = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(sberIdLogin.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(sberIdLogin.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(sberIdLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
