export interface JwtPayload {
    id: string;
}

export interface User {
    username: string;
    passwordHash: string;
    refreshToken?: string;
}