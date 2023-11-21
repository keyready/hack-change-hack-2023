import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatSchema } from '../types/ChatSchema';

const initialState: ChatSchema = {
    username: '',
};

export const ChatSlice = createSlice({
    name: 'ChatSlice',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(createChat.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(createChat.fulfilled, (state, action: PayloadAction<any>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(createChat.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ChatActions } = ChatSlice;
export const { reducer: ChatReducer } = ChatSlice;
