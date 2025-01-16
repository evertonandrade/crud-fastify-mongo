import mongoose from 'mongoose';
import fp from 'fastify-plugin';
import { seedProducts } from './seed.js';

async function dbConnector(app, options) {
  try {
    const { uri, options: mongooseOptions } = options;

    if (!uri) {
      throw new Error('Database URI is required');
    }

    await mongoose.connect(uri, { ...mongooseOptions });
    app.log.info('MongoDB connected');

    app.decorate('mongoose', mongoose);

    await seedProducts(app);

  } catch (error) {
    app.log.error('MongoDB connection error:', error);
    throw error;
  }
}

export default fp(dbConnector);
