import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export default async function (app) {
  // Adicionar item ao carrinho
  app.post('/cart/:userId', async (request, reply) => {
    try {
      const { productId, quantity } = request.body;

      const product = await Product.findById(productId);
      if (!product) {
        return reply.status(404).send({ message: 'Produto não encontrado' });
      }

      let cart = await Cart.findOne({ userId: request.params.userId });
      if (!cart) {
        cart = new Cart({ userId: request.params.userId, items: [] });
      }

      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();

      const updatedCart = await Cart.findById(cart._id).populate(
        'items.productId'
      );

      const cartDto = {
        userId: updatedCart.userId,
        items: updatedCart.items.map(item => ({
          product: {
            id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price
          },
          quantity: item.quantity
        }))
      };

      reply.send(cartDto);
    } catch (error) {
      app.log.erro(error);
      reply.status(500).send({ message: 'Erro ao tentar adicionar produto ao carrinho' });
    }
  });

  // visualizar carrinho
  app.get('/cart/:userId', async (request, reply) => {
    const cart = await Cart.findOne({ userId: request.params.userId }).populate(
      'items.productId'
    );

    if (!cart) {
      return reply.status(404).send({ message: 'Carrinho não encontrado' });
    }

    const cartDto = {
      userId: cart.userId,
      items: cart.items.map(item => ({
        product: {
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price
        },
        quantity: item.quantity
      }))
    };

    return reply.status(200).send(cartDto);
  });
}
