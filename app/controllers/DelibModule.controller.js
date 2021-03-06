const db = require("../models");
const config = require("../config/auth.config");
const DelibModule = db.DelibModule;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  DelibModule.create({
    annee: req.body.annee,
    Moyenne: req.body.Moyenne,
    Coefficient: req.body.Coefficient,
    Credit: req.body.Credit,
    etudiantEtudiantId: req.body.etudiantId,
    matiereMatiereId: req.body.matiereId,
  })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "Delib_Module";
      var action = "Ajouter";
      var id = data.get("DelibModuleId");
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
  DelibModule.findAll()
    .then((results) => {
      res.send({ results });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getByMatIdAndEtudId = (req, res) => {
  var id = req.params.id;
  var mid = req.params.mid;
  DelibModule.findAll({
    where: { etudiantEtudiantId: id, matiereMatiereId: mid },
  })
    .then((results) => {
      res.send({ results });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getBDelibsByEtudiantId = (req, res) => {
  var id = req.params.id;
  DelibModule.findAll({ where: { etudiantEtudiantId: id } })
    .then((results) => {
      res.send({ results });
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getOne = (req, res) => {
  const id = req.params.id;
  DelibModule.findByPk(id)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.DeleteOne = (req, res) => {
  const id = req.params.id;
  DelibModule.destroy({ where: { DelibModuleId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
      var admin = req.params.admin;
      var table = "Delib_Module";
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
  DelibModule.findOne({ where: { DelibModuleId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            annee: req.body.annee,
            Moyenne: req.body.Moyenne,
            Coefficient: req.body.Coefficient,
            Credit: req.body.Credit,
            etudiantEtudiantId: req.body.etudiantId,
            matiereMatiereId: req.body.matiereId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "Delib_Module";
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
