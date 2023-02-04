const AccountCategory = require('../models/accountCategory');

/**
 * Creates account category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createAccountCategory = (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host"); 
    const accountCategory = new AccountCategory({
        title: req.body.title,
        icon: req.body.icon,
        color: req.body.color,
        creator: req.userData.userId!=null ? req.userData.userId : null
    });
    accountCategory.save().then(income => {
        res.status(201).json({
            accountCategory: {
                ... accountCategory,
                id: accountCategory._id,
            }
        });
    }).catch( err => {
        res.status(500).json({
            message: err.message
        })
    });
};

exports.deleteAccountCategory = (req, res, next) => {
    const accountCategoryQuery = Account.findByDelete(req.userData.userId);
    const account = Account(accountCategoryQuery);
    account.then(resut => {
        res.status(201).json({
            account: {
            message: "Account Category has been deleted",
            }
        });
    }).catch( err => {
        res.status(500).json({
            message: err.message
        })
    });
}

/**
 * Retrieves account categories list
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.retrieveAccountCategories = (req, res, next) => {
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
    const accountCategoryQuery = AccountCategory.findDefaultAndCustom().sort(sortJson);
    let fetchedAccountCategories;
    if (currentPage && pageSize) {
        accountCategoryQuery.skip(pageSize *(currentPage - 1)).limit(pageSize);
    }
    accountCategoryQuery.then( documents => {
        fetchedAccountCategories = documents;
        return AccountCategory.findDefaultAndCustom().count();
    }).then(count => {
        res.status(200).json({
            accountCategories: fetchedAccountCategories,
            maxAccountCategories: count
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
};