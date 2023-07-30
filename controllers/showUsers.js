// controllers/showUsers.js
const users = require("../userData.json");

const showUsers = (req, res, next) => {
  try {
    res.render("user", { users });
  } catch (err) {
    next(err);
  }
};

module.exports = showUsers;
