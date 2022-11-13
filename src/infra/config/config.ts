import dotenv from 'dotenv';
import { SUPPORTED_DATABASE } from './constants';

dotenv.config();

export default {
  port: process.env.PORT || 4000,
  database: {
    dialect: process.env.DATABASE_DIALECT || SUPPORTED_DATABASE.MONGO,
    url: process.env.DATABASE_URL || 'mongodb://root:root@localhost:27017/mydb?authSource=admin'
  },
}
