import { Request, Response } from 'express';
import {
    capturePokemon,
    getCapturedPokemons,
    getPokemons,
    getPokemonTypes,
    importPokemons,
    releasePokemon,
} from '../services/pokemon.service';


export const importPokemonsController = async (req: Request, res: Response) => {
    try {
        await importPokemons();
        res.status(200).json({ message: 'Pokémones importados exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPokemonsController = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;
    const { name, type } = req.query;

    try {
        const data = await getPokemons(page, limit, name as string, type as string);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const capturePokemonController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await capturePokemon(id);
        res.status(200).json({ message: 'Pokémon capturado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const releasePokemonController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        await releasePokemon(id);
        res.status(200).json({ message: 'Pokémon liberado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCapturedPokemonsController = async (req: Request, res: Response) => {
    try {
        const pokemons = await getCapturedPokemons();
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPokemonTypesController = async (req: Request, res: Response) => {
    try {
        const types = await getPokemonTypes();
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};