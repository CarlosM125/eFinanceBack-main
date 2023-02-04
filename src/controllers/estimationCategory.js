const EstimationCategory = require('../models/estimationCategory');

/**
 * Estimation cagegory creator
 */
exports.createEstimationCategory = (req, res, next) => {
    const estimationCategory = new EstimationCategory({
        title: req.body.title,
        icon: req.body.icon,
        color: req.body.color,
        parentCategory: req.body.parentCategory ? req.body.parentCategory : null,
        creator: req.userData ? req.userData.userId : null,
    });
    estimationCategory.save().then(estimationCategory => {
        res.status(201).json({
            estimationCategory: {
                ... estimationCategory,
                id: estimationCategory._id,
            }
        });
    }).catch( err => {
        res.status(500).json({
            message: err.message
        })
    });
}

/**
 * Estimation category retriece
 */
exports.retrieveEstimationCategories = (req, res, next) => {
    const today = new Date();
    const monthBeginning = new Date(today.getFullYear(), today.getMonth(), 1);
    const estimationCategoryQuery = EstimationCategory.getRootCategories();
    estimationCategoryQuery.then( documents => {
        fetchedEstimationCategories = documents;
        return EstimationCategory.getRootCategories().count();
    }).then(count => {
        res.status(200).json({
            estimationCategories: fetchedEstimationCategories,
            maxEstimationCategories: count,
            since: monthBeginning
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
};

/**
 * Retrieve estimation category children
 */
exports.retrieveEstimationChildrenCategories = (req, res, next) => {
    const today = new Date();
    const monthBeginning = new Date(today.getFullYear(), today.getMonth(), 1);
    const categoryId = req.params.category;
    const estimationCategoryQuery = EstimationCategory.find({parentCategory: categoryId}).populate('estimations');
    estimationCategoryQuery.then( documents => {
        fetchedEstimationCategories = documents;
        return EstimationCategory.find({parentCategory: categoryId}).count();
    }).then(count => {
        res.status(200).json({
            estimationCategories: fetchedEstimationCategories,
            maxEstimationCategories: count,
            since: monthBeginning
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
}

/**
 * Delete estimation category
 */
exports.deleteEstimationCategory = (req, res, next) => {
    const { id } = req.body;
    EstimationCategory.findByIdAndDelete({ _id: id })
      .then((deleteEstimationCategory) => {
      //   console.log('deleteEstimationCategory', deleteEstimationCategory);
        res.status(201).json({
          message: 'The record has been deleted',
          result: deleteEstimationCategory,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  };
  