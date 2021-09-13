const db = require("../models");
const config = require("../config/auth.config");
const activite = db.activite;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  activite
    .create({
      titre: req.body.titre,
      type: req.body.type,
      date_debut: req.body.date_debut,
      date_fin: req.body.date_fin,
      salleSalleId: req.body.salleId,
      clubClubId: req.body.clubId,
    })
    .then((data) => {
      var datetime =  new Date;
      var admin = req.body.admin;
      var table = "activite";
      var action = "Ajouter";
      var id = data.get("activiteId");
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
  activite
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
  activite
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
  activite
    .destroy({ where: { activiteId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.body.admin;
        var table = "activite";
        var action = "Supprimer";
        var id = data.get("activiteId");
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
  activite
    .findOne({ where: { activiteId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            titre: req.body.titre,
            type: req.body.type,
            date_debut: req.body.date_debut,
            date_fin: req.body.date_fin,
            salleId: req.body.salleId,
          })
          .then((data) => {
            var datetime =new Date;
        var admin = req.body.admin;
        var table = "activite";
        var action = "Modifier";
        var id = data.get("activiteId");
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



