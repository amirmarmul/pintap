import mongoose from 'mongoose';
import config from '../../config/config';

mongoose.Promise = global.Promise
mongoose.connect(config.database.url)
mongoose.connection.on("error", () => {
  console.error("MongoDB connection error")
  process.exit()
})

export default mongoose;
