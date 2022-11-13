import User from '../../domain/User';
import MongooseUser from '../persistance/mongoose/schemas/User';
import UserRepository from '../../domain/UserRepository';

export default class UserRepositoryMongo extends UserRepository {

  async find() {
    const mongooseUsers = await MongooseUser.find({ deletedAt: { $eq: null }});
    return mongooseUsers ? mongooseUsers.map(mongooseUser => {
      return new User(
        mongooseUser.id,
        mongooseUser.name!,
        mongooseUser.password!,
        mongooseUser.createdAt!,
        mongooseUser.updatedAt!,
        mongooseUser.deletedAt!
      )
    }) : [];
  }

  async findOne(id: string) {
    const mongooseUser = await MongooseUser.findOne({ id });
    return mongooseUser ? new User(
      mongooseUser!.id,
      mongooseUser!.name!,
      mongooseUser!.password!,
      mongooseUser!.createdAt!,
      mongooseUser!.updatedAt!,
      mongooseUser!.deletedAt!
    ) : null;
  }

  async findByName(name: string) {
    const mongooseUser = await MongooseUser.findOne({ name });

    return mongooseUser ? new User(
      mongooseUser!.id,
      mongooseUser!.name!,
      mongooseUser!.password!,
      mongooseUser!.createdAt!,
      mongooseUser!.updatedAt!,
      mongooseUser!.deletedAt!
    ) : null;
  }

  validatePassword(password: string, dbPassword: string) {
    return password === dbPassword;
  }

  async save(userEntity: User) {
    const { id, name, password } = userEntity;
    const now = new Date();
    const mongooseUser = new MongooseUser({ id, name, password, createdAt: now, updatedAt: now });
    await mongooseUser.save();
    return mongooseUser ? new User(
      mongooseUser.id,
      mongooseUser.name!,
      mongooseUser.password!,
      mongooseUser.createdAt!,
      mongooseUser.updatedAt!,
      mongooseUser.deletedAt!
    ) : null;
  }

  async update(userEntity: User) {
    const now = new Date();
    const { id, name, password } = userEntity
    const mongooseUser = await MongooseUser.findOne({ id });
    mongooseUser!.name = name;
    mongooseUser!.password = password;
    mongooseUser!.updatedAt = now;
    await mongooseUser?.save();
    return mongooseUser ? new User(
      mongooseUser!.id,
      mongooseUser!.name!,
      mongooseUser!.password!,
      mongooseUser!.createdAt!,
      mongooseUser!.updatedAt!,
      mongooseUser!.deletedAt!
    ) : null;
  }

  async remove(id: string) {
    return MongooseUser.findOneAndUpdate({ id }, { deletedAt: new Date() });
  }
}
