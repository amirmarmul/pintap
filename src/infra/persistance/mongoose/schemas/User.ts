import mongoose from 'mongoose';

interface UserDoc extends mongoose.Document {
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {}

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

const User = mongoose.model('User', userSchema);

export default User;
