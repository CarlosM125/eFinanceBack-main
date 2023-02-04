const mongoose = require('mongoose');

/**
 * Account model
 */
 const accountSchema = mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: false},
    amount: {type: Number, required: true, default: 0.00},
    category: {type: mongoose.Types.ObjectId, ref:"AccountCategory" , required:true},
    creator: {type: mongoose.Types.ObjectId, ref:"User" , required: true},
  },
  {
    statics: {
      findByCreator(creator_id) {
        return this.find({creator: creator_id})
      }}
  });
  
  module.exports = mongoose.model('Account', accountSchema)