import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
// Use environment variables for sensitive information like database credentials
const DB_HOST: string =String( process.env.DB_HOST );
const DB_PORT: number = Number(process.env.DB_PORT);
const DB_NAME: string = String(process.env.DB_NAME);
const DB_USER: string = String(process.env.DB_USER);
const DB_PASSWORD: string = String(process.env.DB_PASSWORD);

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres', // Specify the correct dialect: 'postgres' for Neon

});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export async function createDatabase() {
    try {
        await sequelize.sync({ force: false }); // Creates tables if they don't exist.  `force: true` will drop existing tables!
        console.log('Database and tables created successfully.');
    } catch (error) {
        console.error('Error creating database:', error);
    }
}