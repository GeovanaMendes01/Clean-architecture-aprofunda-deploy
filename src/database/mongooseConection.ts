import mongoose from 'mongoose';

export async function connectMongo(uri: string) {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Banco de dados conectado com sucesso');
  } catch (e) {
    console.error('Erro ao conectar ao banco de dados:', e);
    throw e;
  }
}