import app from './app';
import config from '../config/config';

function server() {
  app.listen(config.port, () => console.log('Listening on', config.port))
}

export default server;
