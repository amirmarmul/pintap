import User from '../../domain/User';

export default function CreateUser(
  name: string,
  password: string,
  { userRepository, uuidService }: any
) {
  const id = uuidService.generate();
  const user = new User(id, name, password);
  return userRepository.save(user);
}
