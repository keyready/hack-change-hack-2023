import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { AuthSchema } from 'pages/AuthPage';
import { UserSchema } from 'entities/User';
import { ConsultantPageTypes } from 'pages/ConsultantPage';
import { UnderwriterSchema } from 'entities/Underwriter';
import { BorrowerSchema } from 'entities/Borrower';

export interface StateSchema {
    ui: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    user: UserSchema;

    // asynchronous reducers
    underwriter?: UnderwriterSchema;
    borrower?: BorrowerSchema;
    authPage?: AuthSchema;
    consultantPage?: ConsultantPageTypes;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface reducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: reducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export interface ThunkError {
    message: string;
}
