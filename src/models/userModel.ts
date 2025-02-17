import {DataTypes, Model, Optional, Sequelize} from 'sequelize';
import {sequelize} from "../config/db";
import bcrypt from 'bcrypt';

const password_salt_round: number = Number(process.env.PASSWORD_SALT_ROUND);

type UserAttribute = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// type UserCreationAttribute =

class UserModel extends Model<UserAttribute, Omit<UserAttribute, 'id'>> implements UserAttribute {
    declare id: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}


UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
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
            validate: {
                isEmail: {
                    msg: 'Please enter a valid email address',
                },
                notEmpty: {
                    msg: 'Please enter a valid email address',
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password cannot be empty."
                },
                len: {
                    args: [6, 128],
                    msg: "Password length should be between 6 pr above."
                }
            }
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

UserModel.beforeCreate(async (user: UserModel) => {
    if (user.password) {


        const salt: string = await bcrypt.genSalt(password_salt_round);
        user.password = await bcrypt.hash(user.password, salt);
        console.log(`hashed password is ${user.password}`);

    }

});


export default UserModel;

