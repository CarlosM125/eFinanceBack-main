const mongoose = require('mongoose');

/**
 * Expenses model
 */
const incomeCategorySchema = mongoose.Schema({
  title: {type: String, required: true},
  icon: {type: String, required: false},
  color: {type: String, required: true},
  creator: {type: mongoose.Types.ObjectId, ref:"User" , required: false}
});

module.exports = mongoose.model('IncomeCategory', incomeCategorySchema);