export default function ValidateAccessToken(
  token: string,
  { accessTokenService }: any
) {
  const decoded = accessTokenService.decode(token);

  if (! decoded) {
    throw new Error('Invalid access token');
  }

  return { uid: decoded.uid };
}
