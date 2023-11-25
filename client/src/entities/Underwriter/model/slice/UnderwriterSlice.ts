import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { underwriterLogin } from '../services/underwriterLogin';
import { Underwriter } from '../types/Underwriter';
import { UnderwriterSchema } from '../types/UnderwriterSchema';

const initialState: UnderwriterSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const UnderwriterSlice = createSlice({
    name: 'UnderwriterSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(underwriterLogin.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(underwriterLogin.fulfilled, (state, action: PayloadAction<Underwriter>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(underwriterLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UnderwriterActions } = UnderwriterSlice;
export const { reducer: UnderwriterReducer } = UnderwriterSlice;
