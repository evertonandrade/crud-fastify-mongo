import Cart from '../models/cart.model.js';
import Purchase from '../models/purchase.model.js';

export default async function (app) {
  app.post('/purchase/:userId', async (request, reply) => {
    try {
      const cart = await Cart.findOne({
        userId: request.params.userId
      }).populate('items.productId');
      if (!cart) {
        return reply.status(404).send({ message: 'Carrinho não encontrado' });
      }

      const items = cart.items.map(item => {
        const total = item.productId.price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: item.productId.price,
          total
        };
      });

      const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

      const purchase = new Purchase({
        userId: request.params.userId,
        items,
        totalAmount
      });

      await purchase.save();
      await Cart.deleteOne({ userId: request.params.userId });

      reply.status(201).send({ message: 'Compra finalizada com sucesso' });
    } catch (error) {
      app.log.erro(error);
      reply.status(500).send({ message: 'Erro ao finalizar compra' });
    }
  });

  app.get('/purchases/:userId/stats', async (request, reply) => {
    const userId = request.params.userId;

    const purchases = await Purchase.find({ userId });

    if (purchases.length === 0) {
      return reply
        .status(404)
        .send({ message: 'Nenhuma compra encontrada para este usuário' });
    }

    const totalPurchases = purchases.length;
    const totalSpent = purchases.reduce(
      (sum, purchase) => sum + purchase.totalAmount,
      0
    );
    const averageSpent = totalSpent / totalPurchases;

    const stats = {
      totalPurchases,
      totalSpent,
      averageSpent
    };

    reply.status(200).send(stats);
  });
}
