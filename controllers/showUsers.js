// controllers/showUsers.js
const User = require('../userData.json')
const showUsers = (req, res, next) => {
  
  User.find()
    .then((users) => {
      res.render("user", { users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = showUsers;
