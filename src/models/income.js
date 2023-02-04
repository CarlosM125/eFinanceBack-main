const mongoose = require('mongoose');

/**
 * Income model
 */
const incomeSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: { type: String, required: false},
  amount: {type: Number, required: true},
  category: {type: mongoose.Types.ObjectId, ref:"IncomeCategory" , required:false},
  date: {type: Date, default: Date.now() + 7*24*60*60*1000, required: true},
  creator: {type: mongoose.Types.ObjectId, ref:"User" , required: true},
  account: {type: mongoose.Types.ObjectId, ref:"Account" , required: false}
});

module.exports = mongoose.model('Income', incomeSchema)
