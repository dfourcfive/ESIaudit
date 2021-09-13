const db = require("../models");
const config = require("../config/auth.config");
const these = db.these;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  these
    .create({
      titre: req.body.titre,
      domaine: req.body.domaine,
      date_Lancement: req.body.date_Lancement,
      departementDepartementId: req.body.departementId,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "these";
      var action = "Ajouter";
      var id = data.get("theseId");
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
  these
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
  these
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
  these
    .destroy({ where: { theseId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.body.admin;
        var table = "these";
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
  these
    .findOne({ where: { theseId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            titre: req.body.titre,
            domaine: req.body.domaine,
            date_Lancement: req.body.date_Lancement,
            departementDepartementId: req.body.departementId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "these";
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

            res.send({ message: "Updated successfully!" });
          });
      } else {
        res.send({ message: "Cannot update" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
