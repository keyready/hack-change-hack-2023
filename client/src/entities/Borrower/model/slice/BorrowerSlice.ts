import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BorrowerSchema } from '../types/BorrowerSchema';
import { borrowerLogin } from '../services/borrowerLogin';
import { borrowerSignup } from '../services/borrowerSignup';
import { Borrower } from '../types/Borrower';

const initialState: BorrowerSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const BorrowerSlice = createSlice({
    name: 'BorrowerSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(borrowerLogin.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(borrowerLogin.fulfilled, (state, action: PayloadAction<Borrower>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(borrowerLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(borrowerSignup.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(borrowerSignup.fulfilled, (state, action: PayloadAction<Borrower>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(borrowerSignup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: BorrowerActions } = BorrowerSlice;
export const { reducer: BorrowerReducer } = BorrowerSlice;
