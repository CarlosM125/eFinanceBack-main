const express = require("express");
const router = express.Router();
const checkAuth = require ("../middleware/check-auth");
const AccountsController = require('../controllers/account');

/**
 * API routes for incomes
 */
 router.post('', checkAuth, AccountsController.createAccount);
 router.get('', checkAuth, AccountsController.retrieveAccounts);
 router.post('/deleteAccount', checkAuth, AccountsController.deleteAccount);
 
 module.exports = router;