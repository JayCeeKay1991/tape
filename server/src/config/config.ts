import dotenv from 'dotenv';
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL || `mongodb://127.0.0.1:27017/${process.env.DB_NAME || 'tape'}`,
  port: process.env.PORT || 4000,
};

export default config;