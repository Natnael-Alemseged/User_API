import express, {NextFunction, Request, Response} from 'express';

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
        if (email && password) {
            res.status(201).send(`successfully created ${name} with email: ${email} and password: ${password}`);
        } else {
            const error = new Error('Error creating user');
            next(error);
        }
    } catch (err) {
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


