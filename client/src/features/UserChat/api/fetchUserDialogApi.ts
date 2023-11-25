import { rtkApi } from 'shared/api/rtkApi';
import { Message } from 'entities/Message';

const fetchUserDialogApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserChat: build.query<Message[], number>({
            query: (userId) => ({
                url: `/api/fetch_borrower_chat/${userId}`,
            }),
        }),
    }),
});

export const useBorrowerChat = fetchUserDialogApi.useGetUserChatQuery;
