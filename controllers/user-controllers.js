const { User, Thought } = require("../models");

const userControl = {
  // GRAB ALL USERS
  getAllUsers(req, res) {
    User.find({})
      .then((allData) => res.json(allData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GRAB USER BY ID
  getUserId({ params }, res) {
    User.findOne({})
      .then((userId) => {
        if (!userId) {
          res
            .status(404)
            .json({ message: "No User can be found with the id!" });
          return;
        }
        res.json(userId);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // CREATE/POST NEW USER
  createUser({ body }, res) {
    User.create(body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userControl;
