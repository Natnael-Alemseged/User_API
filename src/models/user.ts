import {Model, Optional} from 'sequelize';

type UserAttribute = {
    id: number;
    name: string;
    email: string;
    password: string;
}

// type UserCreationAttribute =

class User extends Model<UserAttribute, UserAttribute> {
    declare id:number;
    declare name: string;
    declare email: string;
}