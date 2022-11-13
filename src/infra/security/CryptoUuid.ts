import crypto from 'crypto';
import Uuid from '../../app/security/Uuid';

export default class CryptoUuid extends Uuid {

  generate(): string {
    return crypto.randomUUID();
  }
}
