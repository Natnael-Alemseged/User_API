import {DataTypes, Model, Optional, Sequelize} from 'sequelize';
import {sequelize} from "../config/db";

type UserAttribute = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// type UserCreationAttribute =

class UserModel extends Model<UserAttribute, Omit<UserAttribute, 'id'>> implements UserAttribute {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}


UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {type: DataTypes.DATE, allowNull: false},
        updatedAt: {type: DataTypes.DATE, allowNull: false},
    },
    {
        sequelize,
        tableName: 'Users', // Optional table name
        timestamps: true,
    }
);


export default UserModel;

