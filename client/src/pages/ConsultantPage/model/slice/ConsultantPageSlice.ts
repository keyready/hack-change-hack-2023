import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'entities/User';
import { ConsultantPageTypes } from '../types/ConsultantPageTypes';

const initialState: ConsultantPageTypes = {};

export const ConsultantPageSlice = createSlice({
    name: 'ConsultantPageSSlice',
    initialState,
    reducers: {
        setSelectedChat: (state, action: PayloadAction<Partial<User>>) => {
            state.selectedChat = action.payload;
        },
    },
});

export const { actions: ConsultantPageActions } = ConsultantPageSlice;
export const { reducer: ConsultantPageReducer } = ConsultantPageSlice;
