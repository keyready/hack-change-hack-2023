import { Message } from './Message';

export interface MessageSchema {
    data?: Message;
    isLoading: boolean;
    error?: string;
}
