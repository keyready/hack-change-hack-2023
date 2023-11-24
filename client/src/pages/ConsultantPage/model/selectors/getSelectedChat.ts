import { StateSchema } from 'app/providers/StoreProvider';

export const getSelectedChat = (state: StateSchema) => state.consultantPage?.selectedChat;
