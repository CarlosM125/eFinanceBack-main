const IncomeCategory = require('../models/incomeCategory');

/**
 * Creates account category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createIncomeCategory = (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host"); 
    const incomeCategory = new IncomeCategory({
        title: req.body.title,
        icon: req.body.icon,
        color: req.body.color,
        creator: req.userData.userId ? req.userData.userId : null
    });
    incomeCategory.save().then(income => {
        res.status(201).json({
            incomeCategory: {
                ... incomeCategory,
                id: incomeCategory._id,
            }
        });
    }).catch( err => {
        res.status(500).json({
            message: err.message
        })
    });
};

/**
 * Retrieves account categories list
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.retrieveAccountCategories = (req, res, next) => {
    const pageSize = + req.query.pageSize;
    const currentPage = + req.query.page;
    const incomeCategoryQuery = IncomeCategory.find();
    let fetchedIncomeCategories;
    if (currentPage && pageSize) {
        incomeCategoryQuery.skip(pageSize *(currentPage - 1)).limit(pageSize);
    }
    incomeCategoryQuery.then( documents => {
        fetchedIncomeCategories = documents;
        return IncomeCategory.count();
    }).then(count => {
        res.status(200).json({
            incomeCategories: fetchedIncomeCategories,
            maxIncomeCategories: count
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
};