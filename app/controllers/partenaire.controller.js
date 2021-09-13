const db = require("../models");
const config = require("../config/auth.config");
const partenaire = db.partenaire;
const formation = db.formation;
const formation_partenaire = db.formation_partenaire;
const produce = require("../../app/kafkaClient/producer");

const Op = db.Sequelize.Op;

exports.add = (req, res) => {
  partenaire
    .create({
      Nom: req.body.nom,
      type: req.body.type,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "partenaire";
      var action = "Ajouter";
      var id = data.get("partenaireId");
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
  partenaire
    .findAll({})
    .then((results) => {
      res.send({ results });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getOne = (req, res) => {
  const id = req.params.id;
  partenaire
    .findByPk(id, {})
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.DeleteOne = (req, res) => {
  const id = req.params.id;
  partenaire
    .destroy({ where: { partenaireId: id } })
    .then((data) => {
      if (num == 1) {
        var datetime = new Date;
        var admin = req.body.admin;
        var table = "partenaire";
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

exports.linkWithformation = (req, res) => {
  partenaire
    .findByPk(req.body.partenaireId)
    .then((parten) => {
      if (!parten) {
        res.status(500).send("partenaire not found!");
        return null;
      }
      return formation.findByPk(req.body.formationId).then((forma) => {
        if (!forma) {
          res.status(500).send("formation not found!");
          console.log("Tutorial not found!");
          return null;
        }
        formation_partenaire.create({
          formationId: req.body.formationId,
          partenaireId: req.body.partenaireId,
        });
        res.send(
          `linked formation id=${forma.id} to partenaire id=${parten.id}`
        );
        return parten;
      });
    })
    .catch((err) => {
      res.status(500).send("formation not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

exports.RemovelinkWithformation = (req, res) => {
  partenaire
    .findByPk(req.body.partenaireId)
    .then((etud) => {
      if (!etud) {
        res.status(500).send("outil not found!");
        return null;
      }
      formation_partenaire
        .destroy({ where: { partenaireId: req.body.partenaireId } })
        .then((data) => console.log({ data }))
        .catch((err) => console.log({ err }));
    })
    .catch((err) => {
      res.status(500).send("salle not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

exports.getlinkswithformation = (req, res) => {
  var id = req.params.id;
  formation_partenaire
    .findAll({ where: { partenaireId: id } })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.status(500).send("formation not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

exports.UpdateOne = (req, res) => {
  const id = req.params.id;
  partenaire
    .findOne({ where: { partenaireId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            Nom: req.body.nom,
            type: req.body.type,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "partenaire";
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
