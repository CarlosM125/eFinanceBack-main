const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Creates user
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.createUser =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
          email: req.body.email,
          name: req.body.name,
          lastname: req.body.lastname,
          password: hash
      });
      user.save().then(result => {
          res.status(201).json({
            message: "User has been created",
            result: result
          });
      }).catch(err => {
          res.status(500).json({
              error: err,
              message: "Unable to create user, invalid credentials!"
          })
      });
    });
}

/**
 * Logins user
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */

 exports.userLogin = (req , res, nest) => {
    let fetchUser;
    User.findOne({ email: req.body.email }).then(user => {
      if(!user){
        return res.status(401).json({
          message: "User " + req.body.email + " does not exist!"
        });
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password, fetchUser.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Invalid credentials for " + fetchUser.email + "!"
            });
        }
        const token = jwt.sign({email: fetchUser.email, userId: fetchUser._id},
            process.env.JWT_KEY,
            {expiresIn: '1h'}
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchUser._id
        })
    }).catch(err => {
        return res.status(401).json({
            message: "Invalid credentials!"
        });
    });
}
