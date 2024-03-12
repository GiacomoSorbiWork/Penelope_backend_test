const express = require('express');

const router = express.Router();
const bankAccountController = require('../controllers/bankAccountController.js');

router.post('/', bankAccountController.createAccount);
router.put('/:accountNumber', bankAccountController.updateAccount);
router.get('/:accountNumber/balance', bankAccountController.getBalance);
router.post('/:accountNumber/deposit', bankAccountController.deposit);
router.post('/:accountNumber/withdraw', bankAccountController.withdraw);
router.get(
  '/:accountNumber/transactions',
  bankAccountController.getTransactions
);
router.post('/transfer', bankAccountController.transfer);

module.exports = router;
