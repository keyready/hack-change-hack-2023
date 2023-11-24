import { rtkApi } from 'shared/api/rtkApi';
import { User } from 'entities/User';

const fetchBorrowersApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getBorrowers: build.query<User[], void>({
            query: () => ({
                url: '/api/fetch_borrowers',
            }),
        }),
    }),
});

export const useBorrowers = fetchBorrowersApi.useGetBorrowersQuery;
