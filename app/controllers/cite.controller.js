const db = require("../models");
const config = require("../config/auth.config");
const cite = db.cite;
const etudiant = db.etudiant;
const etudiant_cite = db.etudiant_cite;
const produce = require("../../app/kafkaClient/producer");
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
  cite
    .create({
      nom: req.body.nom,
      type: req.body.type,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "cite";
      var action = "Ajouter";
      var id = data.get("citeId");
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
  cite
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
  cite
    .findByPk(id)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.linkWithEtudiant = (req, res) => {
  etudiant
    .findByPk(req.body.etudiantId)
    .then((etud) => {
      if (!etud) {
        res.status(500).send("etudiant not found!");
        return null;
      }
      return cite.findByPk(req.body.citeId).then((niv) => {
        if (!niv) {
          res.status(500).send("cite not found!");
          return null;
        }
        etudiant_cite
          .create({
            etudiantId: req.body.etudiantId,
            citeId: req.body.citeId,
          })
          .then((result) => console.log({ result }));
        res.send(`linked citeId id=${niv.id} to etudiant id=${etud.id}`);
        return etud;
      });
    })
    .catch((err) => {
      res.status(500).send("cite not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};
exports.getlinksWithEtudiants = (req, res) => {
  const id = req.params.id;
  etudiant_cite
    .findAll({
      where: {
        citeId: id,
      },
    })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};

exports.DeleteOne = (req, res) => {
  const id = req.params.id;
  club
    .destroy({ where: { citeId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.params.admin;
        var table = "club";
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
  cite
    .findOne({ where: { citeId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            type: req.body.type,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "cite";
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
