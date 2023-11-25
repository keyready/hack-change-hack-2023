import { AffiliationType } from 'shared/types';

export interface RequestsStatistics {
    activeRequests: number;
    acceptedRequests: number;
    rejectedRequests: number;
    weekTotal: number;
}

export interface Underwriter {
    id: number;

    name: string;
    email: string;

    jwt: string;

    // для дашборда
    requestsStatistics: RequestsStatistics;

    // принадлежность андеррайтера к обслуживаемой группе
    affiliation: AffiliationType;
}
