export default function ListUsers(
  { userRepository }: any
) {
  return userRepository.find();
}
