const db = require("../models");
const config = require("../config/auth.config");
const club = db.club;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  club
    .create({
      nom: req.body.nom,
      type: req.body.description,
      salleSalleId: req.body.salleId,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "club";
      var action = "Ajouter";
      var id = data.get("clubId");
      produce(
        admin +
          ":" +
          action +
          ":" +
          id +
          ":" +
          datetime.toString() +
          ":" +
          table,
        table
      );
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAll = (req, res) => {
  club
    .findAll()
    .then((results) => {
      res.send({ results });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getOne = (req, res) => {
  const id = req.params.id;
  club
    .findByPk(id)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.DeleteOne = (req, res) => {
  const id = req.params.id;
  club
    .destroy({ where: { clubId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
      var admin = req.body.admin;
      var table = "club";
      var action = "Supprimer";
      produce(
        admin +
          ":" +
          action +
          ":" +
          id +
          ":" +
          datetime.toString() +
          ":" +
          table,
        table
      );
        res.send({ message: "deleted successfully!" });
      } else {
        res.send({ message: "Cannot delete" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};

exports.UpdateOne = (req, res) => {
  const id = req.params.id;
  club
    .findOne({ where: { clubId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            type: req.body.type,
            salleSalleId: req.body.salleId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "club";
            var action = "Modifier";
            produce(
              admin +
                ":" +
                action +
                ":" +
                id +
                ":" +
                datetime.toString() +
                ":" +
                table,
              table
            );
            res.send({ message: "deleted successfully!" });
          });
      } else {
        res.send({ message: "Cannot update" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
