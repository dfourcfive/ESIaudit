const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const auth_produce = require("../../app/kafkaClient/auth_produce");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            var datetime = new Date;
            auth_produce(req.body.username+':'+datetime.toString(),user.id);      
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        var datetime =  Date;
        auth_produce(req.body.username+':'+datetime.toString(),user.id);      
        res.send({ message: "User was registered successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  var text = req.body.username;
  User.findOne({
    where: {
      username: text,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      var datetime = new Date;
      auth_produce(req.body.username+':'+datetime.toString(),user.id);
      res.status(200).send({
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
