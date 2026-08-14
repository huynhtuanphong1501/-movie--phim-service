import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT;
export const RABBITMQ_URL = process.env.RABBITMQ_URL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

console.log({
    PORT: PORT,
    NODE_ENV: NODE_ENV,
    DATABASE_URL: DATABASE_URL,
    RABBITMQ_URL: RABBITMQ_URL,
    JWT_SECRET_KEY: JWT_SECRET_KEY,
    JWT_REFRESH_SECRET: JWT_REFRESH_SECRET,
    CLOUDINARY_URL: CLOUDINARY_URL
});