import User from '../../domain/User';

export default function UpdateUser(
  id: string,
  name: string,
  password: string,
  { userRepository }: any
) {
  const user = new User(id, name, password);
  return userRepository.update(user);
}
