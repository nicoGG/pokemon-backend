import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import bcrypt from 'bcrypt';

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
    },
    {
        tableName: 'users',
        sequelize,
    }
);

User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
});