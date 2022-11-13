import app from './app';
import config from '../config/config';
import bootstrap from '../config/bootstrap';

async function server() {

  await bootstrap();

  app.listen(config.port, () => console.log('Listening on', config.port))
}

export default server;
