const BankAccount = require('../models/bankAccount');
const Transaction = require('../models/transaction');

async function createAccount(req, res) {
  try {
    const { accountNumber, accountHolderName } = req.body;
    const newAccount = new BankAccount({ accountNumber, accountHolderName });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateAccount(req, res) {
  try {
    const { accountNumber } = req.params;
    const updates = req.body;
    const updatedAccount = await BankAccount.findOneAndUpdate(
      { accountNumber },
      updates,
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }
    return res.json(updatedAccount);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getBalance(req, res) {
  try {
    const { accountNumber } = req.params;
    const account = await BankAccount.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    return res.json({ balance: account.balance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getTransactions(req, res) {
  try {
    const { accountNumber } = req.params;
    const account = await BankAccount.findOne({ accountNumber }).populate(
      'transactions'
    );
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    return res.json({ transactions: account.transactions });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deposit(req, res) {
  try {
    const { amount, description } = req.body;
    const { accountNumber } = req.params;
    const account = await BankAccount.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    if (account.status === 'blocked') {
      return res.status(403).json({ error: 'Account is blocked' });
    }
    const newTransaction = new Transaction({ amount, description });
    account.transactions.push(newTransaction);
    account.balance += amount;
    await account.save();
    await newTransaction.save();
    return res
      .status(200)
      .json({ message: 'Deposit successful', transaction: newTransaction });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function withdraw(req, res) {
  try {
    const { amount, description } = req.body;
    const { accountNumber } = req.params;
    const account = await BankAccount.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    if (account.status === 'blocked') {
      return res.status(403).json({ error: 'Account is blocked' });
    }
    if (account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    const newTransaction = new Transaction({ amount: -amount, description });
    account.transactions.push(newTransaction);
    account.balance -= amount;
    await account.save();
    await newTransaction.save();
    return res
      .status(200)
      .json({ message: 'Withdrawal successful', transaction: newTransaction });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function transfer(req, res) {
  try {
    const { fromAccountNumber, toAccountNumber, amount } = req.body;
    const fromAccount = await BankAccount.findOne({
      accountNumber: fromAccountNumber,
    });
    const toAccount = await BankAccount.findOne({
      accountNumber: toAccountNumber,
    });
    if (!fromAccount || !toAccount) {
      return res.status(404).json({ error: 'One or both accounts not found' });
    }
    if (fromAccount.status === 'blocked' || toAccount.status === 'blocked') {
      return res
        .status(403)
        .json({ error: 'One or both accounts are blocked' });
    }
    if (fromAccount.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    const withdrawalTransaction = new Transaction({
      amount: -amount,
      description: `Transfer to ${toAccountNumber}`,
    });
    fromAccount.transactions.push(withdrawalTransaction);
    fromAccount.balance -= amount;

    const depositTransaction = new Transaction({
      amount,
      description: `Transfer from ${fromAccountNumber}`,
    });
    toAccount.transactions.push(depositTransaction);
    toAccount.balance += amount;

    await fromAccount.save();
    await toAccount.save();
    await withdrawalTransaction.save();
    await depositTransaction.save();
    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAccount,
  getBalance,
  getTransactions,
  deposit,
  withdraw,
  transfer,
  updateAccount,
};
