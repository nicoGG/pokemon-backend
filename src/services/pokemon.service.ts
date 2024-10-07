import { Op } from 'sequelize';
import axios from 'axios';
import { Pokemon } from '../models/pokemon.model';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const importPokemons = async (): Promise<void> => {
    for (let id = 1; id <= 150; id++) {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        const data = response.data;

        const types = data.types.map((t: any) => capitalizeFirstLetter(t.type.name));

        await Pokemon.create({
            id: data.id,
            name: data.name,
            types: data.types.map((t: any) => t.type.name),
            image: data.sprites.front_default,
        });
    }
};

export const getPokemons = async (
    page: number,
    limit: number,
    name?: string,
    type?: string
) => {
    const offset = (page - 1) * limit;

    const whereClause: any = {};

    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
    }

    if (type) {
        whereClause.types = { [Op.contains]: [type] };
    }

    const { count, rows } = await Pokemon.findAndCountAll({
        where: whereClause,
        limit,
        offset,
    });

    const totalPages = Math.ceil(count / limit);

    return {
        pokemons: rows,
        currentPage: page,
        totalPages,
        totalPokemons: count,
    };
};

export const capturePokemon = async (id: number): Promise<void> => {
    const capturedPokemons = await Pokemon.findAll({
        where: { captured: true },
        order: [['captureDate', 'ASC']],
    });

    if (capturedPokemons.length >= 6) {
        const oldestPokemon = capturedPokemons[0];
        oldestPokemon.captured = false;
        oldestPokemon.captureDate = null;
        await oldestPokemon.save();
    }

    const pokemon = await Pokemon.findByPk(id);

    if (pokemon) {
        pokemon.captured = true;
        pokemon.captureDate = new Date();
        await pokemon.save();
    } else {
        throw new Error('Pokémon no encontrado');
    }
};

export const releasePokemon = async (id: number): Promise<void> => {
    const pokemon = await Pokemon.findByPk(id);

    if (pokemon && pokemon.captured) {
        pokemon.captured = false;
        pokemon.captureDate = null;
        await pokemon.save();
    } else {
        throw new Error('Pokémon no encontrado o no está capturado');
    }
};

export const getCapturedPokemons = async (): Promise<Pokemon[]> => {
    return Pokemon.findAll({
        where: { captured: true },
        order: [['captureDate', 'DESC']],
    });
};

export const getPokemonTypes = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/type`);
        const types = response.data.results.map((type: any) => capitalizeFirstLetter(type.name));
        return types;
    } catch (error) {
        throw new Error('Error al obtener los tipos de Pokémon');
    }
};