import app from './app';
import { config } from './config/environment';
import { connectMongo } from './database/mongooseConection';

const PORT = config.port;

(async () => {
  if (config.node_env !== 'test') {
    await connectMongo(config.mongo_url);
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();