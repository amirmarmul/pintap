import jwt from 'jsonwebtoken';

import AccessToken from '../../app/security/AccessToken';

const SECRET = 'this-is-secret';

export default class JwtAccessToken extends AccessToken {

  generate(payload: any) {
    return jwt.sign(payload, SECRET);
  }

  decode(token: string) {
    return jwt.verify(token, SECRET);
  }
}
