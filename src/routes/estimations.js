const express = require("express");
const Estimation = require ('../controllers/estimation');
const checkAuth = require ("../middleware/check-auth");
const router = express.Router();

/**
 * API routes for estimation categories
 */
router.post('', checkAuth, Estimation.createEstimation );
router.get('', checkAuth, Estimation.retrieveEstimations );
router.delete('', checkAuth, Estimation.deleteEstimation);

module.exports = router;