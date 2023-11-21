export interface AuthSchema {
    email: string;
    password: string;
    error?: string;
    isLoading: boolean;
    jwtToken?: string;
}
