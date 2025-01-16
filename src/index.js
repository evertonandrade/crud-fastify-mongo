import Fastify from 'fastify';
import dbConnector from './database/db-conector.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import userRoutes from './routes/user.routes.js';

const app = Fastify({ logger: true });

app.register(dbConnector, { uri: process.env.MONGO_URI });
app.register(productRoutes);
app.register(cartRoutes);
app.register(purchaseRoutes);
app.register(userRoutes);

app.listen(
  { host: process.env.HOST, port: process.env.PORT },
  (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
  }
);
