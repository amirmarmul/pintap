import User from '../../domain/User';
import UserRepository from '../../domain/UserRepository';

export default class UserRepositoryInMemory extends UserRepository {
  private data: any = [];

  constructor() {
    super();
  }

  async find() {
    const users = this.data;
    return Promise.resolve(users.filter((user: any) => !user.deletedAt));
  }

  async findOne(id: string) {
    const users = this.data;
    return Promise.resolve(users.find((user: any) => user.id = id));
  }

  async findByName(name: string) {
    const users = this.data;
    return Promise.resolve(users.find((user: any) => user.name === name));
  }

  validatePassword(password: string, dbPassword: string) {
    return password === dbPassword;
  }

  async save(userEntity: User) {
    if (!userEntity.id) {
      return;
    }

    const now = new Date();
    const row: any = Object.assign({
      createdAt: now,
      updatedAt: now,
    }, userEntity);
    this.data.push(row);
    return Promise.resolve(row);
  }

  async update(userEntity: User) {
    if (!userEntity.id) {
     return;
    }

    let row = await this.findOne(userEntity.id);
    Object.assign(row, {
      ...userEntity,
      updatedAt: new Date()
    });
    return Promise.resolve(row);
  }

  async remove(id: string) {
    let row = await this.findOne(id);
    Object.assign(row, {
      deletedAt: new Date()
    });
    return Promise.resolve();
  }
}
