import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

export const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            const passwordValid = await user.checkPassword(password);
            if (passwordValid) {
                const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
                    expiresIn: '1h',
                });
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};