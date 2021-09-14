const db = require("../models");
const config = require("../config/auth.config");
const semestre = db.semestre;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  semestre
    .create({
      numero: req.body.numero,
      desc: req.body.desc,
      niveauxNiveauId: req.body.niveauId,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "semestre";
      var action = "Ajouter";
      var id = data.get("semestreId");
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
  semestre
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
  semestre
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
  semestre
    .destroy({ where: { semestreId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.params.admin;
        var table = "semestre";
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
  semestre
    .findOne({ where: { semestreId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            numero: req.body.numero,
            desc: req.body.desc,
            niveauNiveauId: req.body.niveauId,
          })
          .then((data) => {
            var datetime =new Date;
            var admin = req.body.admin;
            var table = "semestre";
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
          });
      } else {
        res.send({ message: "Cannot update" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
