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

        if (!password) {
            const error: Error = Error('password must be at least 6 characters long');
            (error as any).statusCode = 400;

            next(error);
        }
        if (!password || password.length < 6) {
            const error = new Error('Password must be at least 6 characters long');
            (error as any).statusCode = 400;
            return next(error);
        }

        if (!name) {
            const error = new Error('Name is required');
            (error as any).statusCode = 400;
            return next(error);
        }

        if (email) {
        }
        // Ensure name is a string
        const userName: string = String(name);

        if (email && password && name) {

            const newUser: UserModel = await UserModel.create({
                email: email,
                password: password, // Store the HASHED password
                name: userName,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            newUser.save();

            const responseJson = {success:true ,message: 'successfully created user',data: newUser};

            res.status(201).send(responseJson);
        } else {
            const error = new Error('Error creating user');
            next(error);
        }
    } catch (err) {
        console.error(err);
        console.error('error creating user exception');
        next(err);
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


