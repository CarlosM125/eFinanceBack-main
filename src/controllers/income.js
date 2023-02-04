const Income = require('../models/income');

/**
 * Creates an income
 * @param {*} req request
 * @param {*} res response
 * @param {*} next 
 */
exports.createIncome = (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host"); 
    const income = new Income({
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
        account: req.body.account,
        creator: req.userData.userId,
    });
    income.save().then(income => {
        res.status(201).json({
            income: {
                ... income,
                id: income._id,
            }
        });
    }).catch( err => {
        res.status(500).json({
            message: err.message
        })
    });
};

/**
 * Retrieves incomes
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.retrieveIncomes = (req, res, next) => {
    const today = new Date();
    const monthBeginning = new Date(today.getFullYear(), today.getMonth(), 1);

    const pageSize = + req.query.pageSize;
    const currentPage = + req.query.page;
    const incomeQuery = Income.find({creator: req.userData.userId,  $lt: monthBeginning});
    console.log(incomeQuery);
    let fetchedIncomes;
    if (currentPage && pageSize) {
        incomeQuery.skip(pageSize *(currentPage - 1)).limit(pageSize);
    }
    incomeQuery.then( documents => {
        fetchedIncomes = documents;
        return Income.find({creator: req.userData.userId, $lt: monthBeginning }).count();
    }).then(count => {
        res.status(200).json({
            incomes: fetchedIncomes,
            maxIncomes: count
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
};