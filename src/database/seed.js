import Product from '../models/product.model.js';

export async function seedProducts(app) {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const seedProducts = [
        {
          name: 'Product A',
          price: 100,
          description: 'Description of Product A'
        },
        {
          name: 'Product B',
          price: 200,
          description: 'Description of Product B'
        },
        {
          name: 'Product C',
          price: 300,
          description: 'Description of Product C'
        }
      ];

      await Product.insertMany(seedProducts);
      app.log.info('Products seeded');
    } else {
      app.log.info('Products already exist, skipping seed');
    }
  } catch (error) {
    app.log.error('Error seeding products:', error);
    throw error;
  }
}
