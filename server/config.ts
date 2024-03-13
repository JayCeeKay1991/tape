import dotenv from 'dotenv';
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL ? process.env.DB_URL : 'mongodb://127.0.0.1:27017',
  dbName: process.env.DB_NAME ? process.env.DB_NAME : 'thesis',
  port: process.env.PORT ? process.env.PORT : 4000
};

export default config;