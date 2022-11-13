import server from './infra/webserver/server';

export const start = async () => {
  try {
    await server();

  } catch (error) {
    console.log(error)
  }
};

start();
