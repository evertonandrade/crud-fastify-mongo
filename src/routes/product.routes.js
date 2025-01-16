import Product from '../models/product.model.js';

export default async function (app) {
  // Visualizar produtos
  app.get('/products', async (request, reply) => {
    const products = await Product.find();

    const productsDto = products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price
    }));

    reply.send(productsDto);
  });

  // Visualizar um produto
  app.get('/products/:id', async (request, reply) => {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return reply.status(404).send({ message: 'Product not found' });
    }

    const productDto = {
      id: product._id,
      name: product.name,
      price: product.price
    };

    reply.send(productDto);
  });
}
