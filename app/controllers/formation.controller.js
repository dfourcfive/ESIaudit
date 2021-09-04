const db = require("../models");
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;
const partenaire = db.partenaire;
const formation = db.formation;
const formation_partenaire = db.formation_partenaire;
const produce = require("../../app/kafkaClient/producer");
exports.add = (req, res) => {
  formation
    .create({
      nom: req.body.nom,
      description: req.body.description,
      departementDepartementId: req.body.departementId,
    })
    .then((data) => {
      var datetime = new Date.now();
      var admin = req.body.admin;
      var table = "formation";
      var action = "Ajouter";
      var idd = data.get("formationId");
      produce(
        admin +
          ":" +
          action +
          ":" +
          idd +
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
  formation
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
  formation
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
  formation
    .destroy({ where: { formationId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date.now();
        var admin = req.body.admin;
        var table = "formation";
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
exports.linkWithPartenaire = (req, res) => {
  formation
    .findByPk(req.body.formationId)
    .then((parten) => {
      if (!parten) {
        res.status(500).send("partenaire not found!");
        return null;
      }
      return partenaire.findByPk(req.body.partenaireId).then((forma) => {
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

exports.getlinkswithformation = (req, res) => {
  var id = req.params.id;
  formation_partenaire
    .findAll({ where: { formationId: id } })
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.status(500).send("formation not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

exports.RemovelinkWithPartenaire = (req, res) => {
  formation
    .findByPk(req.body.formationId)
    .then((etud) => {
      if (!etud) {
        res.status(500).send("outil not found!");
        return null;
      }
      formation_partenaire
        .destroy({ where: { formationId: req.body.formationId } })
        .then((data) => console.log({ data }))
        .catch((err) => console.log({ err }));
    })
    .catch((err) => {
      res.status(500).send("salle not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

exports.UpdateOne = (req, res) => {
  const id = req.params.id;
  formation
    .findOne({ where: { formationId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            description: req.body.description,
            departementDepartementId: req.body.departementId,
          })
          .then((data) => {
            var datetime = new Date.now();
            var admin = req.body.admin;
            var table = "formation";
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
