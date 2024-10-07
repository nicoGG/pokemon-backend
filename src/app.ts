import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pokemonRoutes from './routes/pokemon.routes';
import authRoutes from './routes/auth.routes';
import sequelize from './database';
import initializeAdminUser from './utils/create_admin';
import { setupSwagger } from './swagger';

const app = express();
const port = 3000;

app.use(express.json());

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);

sequelize.sync({ force: false }).then(async () => {
    await initializeAdminUser();
    app.listen(port, () => {
        console.log(`API ejecutándose en http://localhost:${port}`);
        console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
    });
});