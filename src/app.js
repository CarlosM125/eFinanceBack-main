const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const accountCategoriesRouter = require('./routes/accountCategory');
const accountsRouter = require('./routes/accounts');
const expenseCategoriesRouter = require('./routes/expenseCategories');
const expenseRouter = require('./routes/expenses');
const incomeCategoriesRouter = require('./routes/incomeCategories');
const incomeRouter = require('./routes/incomes');
const reportRouter = require('./routes/report');
const estimationCategoriesRouter = require('./routes/estimationCategory');
const estimationsRouter = require('./routes/estimations');

const app = express();
const connectionString=`mongodb+srv://${process.env.MONGO_ATLAS_USERMAME}:${process.env.MONGO_ATLAS_PWD}@efinancetest.m4hngbn.mongodb.net/efinancetest?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
  .then(() => {
    console.info("***** Database connected ********")
  })
  .catch((err) => {
    console.error(err);
  })
/**
 * Middleware Set response headers for allow other origins, accept all methods, and accept several request headers
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})
/**
 * Middlewares
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join("backend/images")));

/**
 * Adding routes
 */
app.use('/api/users', userRoutes);
app.use('/api/accountcategories', accountCategoriesRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/expensecategories', expenseCategoriesRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/incomecategories', incomeCategoriesRouter);
app.use('/api/incomes', incomeRouter);
app.use('/api/reports', reportRouter);
app.use('/api/estimationCategories', estimationCategoriesRouter);
app.use('/api/estimations', estimationsRouter);

module.exports = app;