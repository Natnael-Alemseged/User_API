import express, {NextFunction, Request, Response} from 'express';
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";


const password_salt_round: number = Number(process.env.PASSWORD_SALT_ROUND);

interface User {
    name: string;
    email: string;
    password: string;
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password, name} = req.body as User;
    try {
        if (!email) {
            const error = Error('email not provided');
            (error as any).statusCode = 400;
            next(error);
        }

        if ( !password) {
            const error = Error('password must be at least 6 characters long');
            (error as any).statusCode = 400;

            next(error);
        }
        if (email && password && name) {
            const salt = await bcrypt. genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log(hashedPassword);
            const newUser = await UserModel.create({
                email,
                password: hashedPassword, // Store the HASHED password
                name,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            newUser.save();

            res.status(201).send(`successfully created ${name} with email: ${email} and password: ${password}`);
        } else {
            const error = new Error('Error creating user');
            next(error);
        }
    } catch (err) {
        console.error(err);
        next('Failed to create user');
    }
};


export const getUsers = (req: Request, res: Response) => {
    res.status(200).send('fetching all users');
};

export const deleteUser = (req: Request, res: Response) => {
    const id = req.params.id;
};

export const updateUser = (req: Request, res: Response) => {
    const id = req.params.id;

    res.status(200).send(`successfully update user with id ${id}`);

};


