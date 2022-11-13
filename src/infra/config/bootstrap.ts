import config from './config';
import { SUPPORTED_DATABASE } from './constants';

export default function bootstrap() {

  if (config.database.dialect === SUPPORTED_DATABASE.MONGO) {
    require('../persistance/mongoose/mongoose');
  }
}
