export type { User } from './model/types/User';
export type { UserSchema } from './model/types/UserSchema';
export { UserActions, UserReducer } from './model/slice/UserSlice';
export { sberIdLogin } from './model/services/sberIdLogin';
export type { UserRoles } from './model/types/UserIntefaces';
export {
    getUserRole,
    getUserData,
    getUserIsLoading,
    getUserError,
} from './model/selectors/UserSelectors';
