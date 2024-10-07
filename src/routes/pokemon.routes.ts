import { Router } from 'express';
import {
    importPokemonsController,
    getPokemonsController,
    capturePokemonController,
    releasePokemonController,
    getCapturedPokemonsController,
} from '../controllers/pokemon.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Pokémon
 *   description: Endpoints para gestionar Pokémon
 */

/**
 * @swagger
 * /api/pokemon/import:
 *   post:
 *     summary: Importar los primeros 150 Pokémon
 *     tags: [Pokémon]
 *     responses:
 *       200:
 *         description: Pokémon importados exitosamente
 *       500:
 *         description: Error al importar Pokémon
 */
router.post('/import', importPokemonsController);

router.use(authMiddleware);

/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     summary: Listar Pokémon
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrar por tipo
 *     responses:
 *       200:
 *         description: Lista de Pokémon
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', getPokemonsController);

/**
 * @swagger
 * /api/pokemon/capture/{id}:
 *   post:
 *     summary: Capturar un Pokémon
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del Pokémon a capturar
 *     responses:
 *       200:
 *         description: Pokémon capturado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/capture/:id', capturePokemonController);

/**
 * @swagger
 * /api/pokemon/release/{id}:
 *   post:
 *     summary: Liberar un Pokémon
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del Pokémon a liberar
 *     responses:
 *       200:
 *         description: Pokémon liberado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/release/:id', releasePokemonController);

/**
 * @swagger
 * /api/pokemon/captured:
 *   get:
 *     summary: Listar Pokémon capturados
 *     tags: [Pokémon]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Pokémon capturados
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/captured', getCapturedPokemonsController);

export default router;