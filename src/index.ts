import bootstrap from './infra/config/bootstrap';
import server from './infra/webserver/server';

const start = async () => {
  try {
    await bootstrap();

    await server();

  } catch (error) {
    console.log(error)
  }
};

start();
