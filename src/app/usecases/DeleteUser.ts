export default function DeleteUser(
  id: string,
  { userRepository }: any
) {
  return userRepository.remove(id);
}
