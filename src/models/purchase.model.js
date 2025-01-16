import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
