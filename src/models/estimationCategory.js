const mongoose = require('mongoose');

/**
 * Expenses model
 */
const estimationCategorySchema = mongoose.Schema({
  title: {type: String, required: true},
  icon: {type: String, required: false},
  color: {type: String, required: false},
  creator: {type: mongoose.Types.ObjectId, ref:"User" , required: false},
  estimations: [{type: mongoose.Types.ObjectId, ref:"Estimation"},]
}, {
  statics: {
    getRootCategories() {
      return this.find({
          parentCategory: null
      });
    },
    getChildrenCategories(parentCategoryId) {
      return this.find({
        parentCategory: parentCategoryId
      });
    }
  }
});

module.exports = mongoose.model('EstimationCategory', estimationCategorySchema);
