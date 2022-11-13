export default async function GenerateAccessToken(
  name: string,
  password: string,
  { userRepository, accessTokenService }: any
) {
  const user = await userRepository.findByName(name);

  if (!user) {
    throw new Error('Bad credentials');
  }

  if (! userRepository.validatePassword(password, user.password)) {
    throw new Error('Bad credentials');
  }

  return accessTokenService.generate({ uid: user.id })
}
