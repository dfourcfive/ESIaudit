const db = require("../models");
const config = require("../config/auth.config");
const DelibNiveau = db.DelibNiveau;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  DelibNiveau.create({
    année: req.body.année,
    MoyenneS1: req.body.MoyenneS1,
    MoyenneS2: req.body.MoyenneS2,
    CreditS1: req.body.CreditS1,
    CreditS2: req.body.CreditS2,
    Observation: req.body.Observation,
    etudiantEtudiantId: req.body.etudiantId,
    niveauNiveauId: req.body.niveauId,
  })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "Delib_Niveau";
      var action = "Ajouter";
      var id = data.get("DelibNiveauId");
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
  DelibNiveau.findAll()
    .then((results) => {
      res.send({ results });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getOne = (req, res) => {
  const id = req.params.id;
  DelibNiveau.findByPk(id)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.DeleteOne = (req, res) => {
  const id = req.params.id;
  DelibNiveau.destroy({ where: { DelibNiveauId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.params.admin;
        var table = "Delib_Niveau";
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
  DelibNiveau.findOne({ where: { DelibNiveauId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            année: req.body.année,
            MoyenneS1: req.body.MoyenneS1,
            MoyenneS2: req.body.MoyenneS2,
            CreditS1: req.body.CreditS1,
            CreditS2: req.body.CreditS2,
            Observation: req.body.Observation,
            etudiantId: req.body.etudiantId,
            niveauNiveauId: req.body.niveauId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "Delib_Niveau";
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
