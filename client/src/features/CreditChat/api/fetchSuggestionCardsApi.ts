import { rtkApi } from 'shared/api/rtkApi';
import { SuggestionCard } from '../model/types/CreditChatTypes';

const fetchSuggestionCardsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSuggestionsCard: build.query<SuggestionCard[], void>({
            query: () => ({
                url: '/api/suggestion_card',
            }),
        }),
    }),
});

export const useSuggestionsCards = fetchSuggestionCardsApi.useGetSuggestionsCardQuery;
