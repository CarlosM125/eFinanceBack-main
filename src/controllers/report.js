const mongoose = require('mongoose');
const Expense = require('../models/expense');
const Income = require('../models/income');
const Estimation = require('../models/estimation');

exports.totalExpenses = (req, res, next) => {
    const today = new Date();
    const monthBeginning = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const expenseQuery = Expense.aggregate (
        [
            {
              '$match': {
                'creator': mongoose.Types.ObjectId(req.userData.userId)

              }
            }, {
              '$group': {
                '_id': '$creator', 
                'totalAmount': {
                  '$sum': '$amount'
                }
              }
            }
        ]
    );
    expenseQuery.then( documents => {
        console.log(documents);
        fetchedExpenses = documents;
        return documents.length;
    }).then(count => {
        res.status(200).json({
            totalExpense: fetchedExpenses
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
};

exports.totalIncomes  = (req, res, next) => {
    const today = new Date();
    const monthBeginning = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const incomeQuery = Income.aggregate (
        [
            {
              '$match': {
                'creator': mongoose.Types.ObjectId(req.userData.userId)
              }
            }, {
              '$group': {
                '_id': '$creator', 
                'totalAmount': {
                  '$sum': '$amount'
                }
              }
            }
        ]
    );
    incomeQuery.then( documents => {
        console.log(documents);
        fetchedImcome = documents;
        return documents.length;
    }).then(count => {
        res.status(200).json({
            totalIncome: fetchedImcome
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
}

exports.totalEstimated  = (req, res, next) => {
    const today = new Date();
    const monthBeginning = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const estimationQuery = Estimation.aggregate (
        [
            {
              '$match': {
                'creator': mongoose.Types.ObjectId(req.userData.userId)
              }
            }, {
              '$group': {
                '_id': '$creator',
                'totalAmount': {
                  '$sum': '$amount'
                }
              }
            }
        ]
    );
    estimationQuery.then( documents => {
        console.log(documents);
        fetchedEstimated = documents;
        return documents.length;
    }).then(count => {
        res.status(200).json({
            totalEstimated: fetchedEstimated
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
}
