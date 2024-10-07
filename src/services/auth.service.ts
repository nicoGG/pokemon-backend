// src/services/auth.service.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'your_jwt_secret'; // Cambia esto por una clave más segura
const JWT_EXPIRATION = '15m'; // Tiempo de expiración del access token
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret'; // Cambia esto por una clave más segura
const REFRESH_TOKEN_EXPIRATION = '7d'; // Tiempo de expiración del refresh token

export class AuthService {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    generateAccessToken(userId: string): string {
        return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    }

    generateRefreshToken(userId: string): string {
        return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    }

    verifyAccessToken(token: string): JwtPayload {
        return jwt.verify(token, JWT_SECRET) as JwtPayload; // Asegúrate de usar type assertion aquí
    }

    verifyRefreshToken(token: string): JwtPayload {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload; // Asegúrate de usar type assertion aquí
    }
}