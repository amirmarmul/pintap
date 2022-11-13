import User from './User';

export default abstract class UserRepository {

  abstract find(): any;
  abstract findOne(id: string): any;
  abstract findByName(name: string): any;
  abstract validatePassword(password: string, dbPassword: string): boolean;
  abstract save(userEntity: User): any;
  abstract update(userEntity: User): any;
  abstract remove(id: string): any;
}
