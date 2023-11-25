export interface SuggestionCard {
    id: number;
    title: string;
}

export interface CreditChatSchema {
    data?: SuggestionCard[];
    isLoading: boolean;
    error?: string;
}
