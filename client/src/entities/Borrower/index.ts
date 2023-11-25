export type { Borrower } from './model/types/Borrower';
export type { BorrowerSchema } from './model/types/BorrowerSchema';
export { BorrowerActions, BorrowerReducer } from './model/slice/BorrowerSlice';
export {
    getBorrowerData,
    getBorrowerIsLoading,
    getBorrowerError,
} from './model/selectors/BorrowerSelectors';
export { borrowerSignup } from './model/services/borrowerSignup';
export { borrowerLogin } from './model/services/borrowerLogin';
