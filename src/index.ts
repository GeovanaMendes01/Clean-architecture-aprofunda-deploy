/*
import 'dotenv/config';
import app from './app';
import { config } from './config/environment';
import { connectMongo } from './database/mongooseConection';

const PORT = config.port;

(async () => {
  try {
    await connectMongo(config.mongo_url);
    console.log('Conectado ao MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
})();
*/

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