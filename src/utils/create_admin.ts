import { User } from "../models/user.model";

const initializeAdminUser = async () => {
    const adminUser = await User.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
        await User.create({ username: 'admin', password: 'admin' });
        console.log('Usuario admin creado con éxito (username: admin, password: admin)');
    } else {
        console.log('El usuario admin ya existe');
    }
};

export default initializeAdminUser;