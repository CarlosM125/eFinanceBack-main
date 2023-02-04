const express = require("express");
const checkAuth = require ("../middleware/check-auth");
const ReportController = require('../controllers/report')
const router = express.Router();

/**
 * API routes for incomes
 */
router.get('/totalexpenses', checkAuth, ReportController.totalExpenses);
router.get('/totalincomes', checkAuth, ReportController.totalIncomes);
router.get('/totalestimated', checkAuth, ReportController.totalEstimated);

module.exports = router;