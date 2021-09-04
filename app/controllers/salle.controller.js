const db = require("../models");
const config = require("../config/auth.config");
const salle = db.salle;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  salle
    .create({
      nom: req.body.nom,
      type: req.body.description,
      capacite: req.body.capacite,
      departementDepartementId: req.body.departementId,
    })
    .then((data) => {
      var datetime = new Date.now();
      var admin = req.body.admin;
      var table = "salle";
      var action = "Ajouter";
      var id = data.get("salleId");
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
  salle
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
  salle
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
  salle
    .destroy({ where: { salleId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date.now();
        var admin = req.body.admin;
        var table = "salle";
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
  salle
    .findOne({ where: { salleId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            type: req.body.description,
            capacite: req.body.capacite,
            departementDepartementId: req.body.departementId,
          })
          .then((data) => {
            var datetime = new Date.now();
            var admin = req.body.admin;
            var table = "salle";
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
