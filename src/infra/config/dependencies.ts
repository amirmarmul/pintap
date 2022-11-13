import config from './config';
import { SUPPORTED_DATABASE } from './constants';

import UserRepositoryMongo from '../repositories/UserRepositoryMongo';
import JwtAccessToken from '../security/JwtAccessToken';
import CryptoUuid from '../security/CryptoUuid';

const dependencies: any = {
  accessTokenService: new JwtAccessToken(),
  uuidService: new CryptoUuid(),
}

if (config.database.dialect == SUPPORTED_DATABASE.MONGO) {
  dependencies.userRepository = new UserRepositoryMongo();
}

export default dependencies;
