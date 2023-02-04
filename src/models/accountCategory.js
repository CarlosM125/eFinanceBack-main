const mongoose = require('mongoose');

/**
 * Expenses model
 */
const accountCategorySchema = mongoose.Schema({
  title: {type: String, required: true},
  icon: {type: String, required: false},
  color: {type: String, required: false},
  creator: {type: mongoose.Types.ObjectId, ref:"User" , required: false}
}, {
  statics: {
    findDefaultAndCustom(creator_id) {
      return this.find({
        $or:[{
          creator: creator_id,
          creator: null,
        }]
      })
    }
  }
});

module.exports = mongoose.model('AccountCategory', accountCategorySchema)
