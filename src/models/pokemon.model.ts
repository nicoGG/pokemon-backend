import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

/**
 * @swagger
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - types
 *         - image
 *         - captured
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del Pokémon
 *         name:
 *           type: string
 *           description: Nombre del Pokémon
 *         types:
 *           type: array
 *           items:
 *             type: string
 *           description: Tipos del Pokémon
 *         image:
 *           type: string
 *           description: URL de la imagen del Pokémon
 *         captured:
 *           type: boolean
 *           description: Estado de captura del Pokémon
 *         captureDate:
 *           type: string
 *           format: date-time
 *           description: Fecha en que el Pokémon fue capturado
 *       example:
 *         id: 25
 *         name: pikachu
 *         types:
 *           - electric
 *         image: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png
 *         captured: true
 *         captureDate: 2021-10-01T12:00:00Z
 */
export class Pokemon extends Model {
    public id!: number;
    public name!: string;
    public types!: string[];
    public image!: string;
    public captured!: boolean;
    public captureDate!: Date | null;
}

Pokemon.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        types: DataTypes.JSON,
        image: DataTypes.STRING,
        captured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        captureDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'pokemons',
        sequelize,
    }
);