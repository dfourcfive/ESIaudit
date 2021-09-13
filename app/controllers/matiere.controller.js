const db = require("../models");
const config = require("../config/auth.config");
const matiere = db.matiere;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  matiere
    .create({
      nom: req.body.nom,
      type: req.body.type,
      Coefficient: req.body.Coefficient,
      credit: req.body.credit,
      ChargeHoraire: req.body.ChargeHoraire,
      ueUeId: req.body.ueId,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "matiere";
      var action = "Ajouter";
      var id = data.get("matiereId");
      produce(
        admin +
          "::" +
          action +
          "::" +
          id +
          "::" +
          datetime.toString() +
          "::" +
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
  matiere
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
  matiere
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
  matiere
    .destroy({ where: { matiereId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime =new Date;
        var admin = req.body.admin;
        var table = "matiere";
        var action = "Supprimer";
        produce(
          admin +
            "::" +
            action +
            "::" +
            id +
            "::" +
            datetime.toString() +
            "::" +
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
  matiere
    .findOne({ where: { matiereId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            type: req.body.type,
            Coefficient: req.body.Coefficient,
            credit: req.body.credit,
            ChargeHoraire: req.body.ChargeHoraire,
            ueUeId: req.body.ueId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "matiere";
            var action = "Modifier";
            produce(
              admin +
                "::" +
                action +
                "::" +
                id +
                "::" +
                datetime.toString() +
                "::" +
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
