import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageSchema } from '../types/MessageSchema';

const initialState: MessageSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const MessageSlice = createSlice({
    name: 'MessageSlice',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchMessage.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchMessage.fulfilled, (state, action: PayloadAction<any>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchMessage.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: MessageActions } = MessageSlice;
export const { reducer: MessageReducer } = MessageSlice;
