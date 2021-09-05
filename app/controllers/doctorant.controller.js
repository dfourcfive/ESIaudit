const db = require("../models");
const config = require("../config/auth.config");
const doctorant = db.doctorant;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  doctorant
    .create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      date_naissance: req.body.date_naissance,
      lieu_de_nissance: req.body.lieu_de_nissance,
      adresse: req.body.adresse,
      sex: req.body.sex,
      departementDepartementId: req.body.departementId,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "doctorant";
      var action = "Ajouter";
      var id = data.get("doctorantId");
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
  doctorant
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
  doctorant
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
  doctorant
    .destroy({ where: { activiteId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.body.admin;
        var table = "doctorant";
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
  doctorant
    .findOne({ where: { doctorantId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            prenom: req.body.prenom,
            date_naissance: req.body.date_naissance,
            lieu_de_nissance: req.body.lieu_de_nissance,
            adresse: req.body.adresse,
            sex: req.body.sex,
            departementDepartementId: req.body.departementId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "doctorant";
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
