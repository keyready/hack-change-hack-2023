import { Underwriter } from './Underwriter';

export interface UnderwriterSchema {
    data?: Underwriter;
    isLoading: boolean;
    error?: string;
}
