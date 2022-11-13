import { SUPPORTED_DATABASE } from './constants';

export default {
  database: {
    dialect: process.env.DATABASE_DIALECT || SUPPORTED_DATABASE.MONGO,
    url: process.env.DATABASE_URL || 'mongodb://root:root@localhost:27017/mydb?authSource=admin'
  }
}
