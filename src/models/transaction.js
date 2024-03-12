const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
