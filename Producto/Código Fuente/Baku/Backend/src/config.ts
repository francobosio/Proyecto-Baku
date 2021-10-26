import dotenv from 'dotenv'
dotenv.config();

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'Baku',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.PORT || '4000',
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET
}