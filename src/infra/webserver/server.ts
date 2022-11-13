import app from './app';

const PORT = 4000;

function server() {
  app.listen(PORT, () => console.log('Listening on', PORT))
}

export default server;
