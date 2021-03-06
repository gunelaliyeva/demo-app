const express = require('express');

const paymentController = require('../controllers/payment');

const router = express.Router();

router.get('/categories', paymentController.getPaymentCategories);

router.post('/new', paymentController.makeNewPayment);

module.exports = router;