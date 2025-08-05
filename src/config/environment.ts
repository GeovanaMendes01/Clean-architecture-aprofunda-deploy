import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongo_url: process.env.MONGO_URI || 'mongodb://localhost:27017/biblioteca',
  jwt_secret: process.env.JWT_SECRET || 'minha-chave',
  node_env: process.env.NODE_ENV || 'production',
};