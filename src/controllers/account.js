const Account = require('../models/account');

/**
 * Creates account
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createAccount = (req, res, next) => {
    const account = new Account({
        name: req.body.name,
        color: req.body.color,
        amount: req.body.amount,
        category: req.body.category,
        creator: req.userData.userId ? req.userData.userId : null
    });
    account.save().then(income => {
        res.status(201).json({
            account: {
                ... account,
                id: account._id,
            }
        });
    }).catch( err => {
        res.status(500).json({
            message: err.message
        })
    });
}


exports.deleteAccount = (req, res, next) => {
    const accountQuery = Account.findByDelete(req.userData.userId);
    const account = Account(accountQuery);
    account.then(result => {
        res.status(201).json({
            account: {
            message: "Account has been deleted",
            }
        });
    }).catch( err => {
        res.status(500).json({
            message: err.message
        })
    });
}

/**
 * Retrieves all accounts
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.retrieveAccounts = (req, res, next) => {
    const pageSize = + req.query.pageSize;
    const currentPage = + req.query.page;
    const fieldSort = req.query.sort;
    let arraySort=(fieldSort != undefined ? fieldSort : " ").split("~");
    let sortJson={};
    arraySort.forEach(e=>{
        let arrayPrmSort=e.split("-");
        let sortType = arrayPrmSort[1] == "asc" ? 1:-1;
        sortJson[arrayPrmSort[0]] = sortType;
    });
    const accountQuery = Account.findByCreator(req.userData.userId).sort(sortJson);
    let fetchedAccounts;
    if (currentPage && pageSize) {
       accountQuery.skip(pageSize *(currentPage - 1)).limit(pageSize);
    }
   accountQuery.then( documents => {
        fetchedAccounts = documents;
        return Account.findByCreator(req.userData.userId).count();
    }).then(count => {
        res.status(200).json({
            accounts: fetchedAccounts,
            maxAccounts: count
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
}