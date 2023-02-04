const express = require("express");
const IncomCategoriesController = require('../controllers/incomeCategory')
const router = express.Router();

/**
 * API routes for incomes
 */
router.post('', IncomCategoriesController.createIncomeCategory);
router.get('', IncomCategoriesController.retrieveAccountCategories);

module.exports = router;