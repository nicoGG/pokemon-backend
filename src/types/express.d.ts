import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            query: {
                page?: string;
                limit?: string;
                // Agrega más propiedades según sea necesario
            };
        }
    }
}