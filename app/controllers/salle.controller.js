const db = require("../models");
const config = require("../config/auth.config");
const salle = db.salle;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");

const csv = require('csv-parser');
const { Readable } = require('stream');

exports.add = (req, res) => {
  salle
    .create({
      nom: req.body.nom,
      type: req.body.description,
      capacite: req.body.capacite,
      departementDepartementId: req.body.departementId,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "salle";
      var action = "Ajouter";
      var id = data.get("salleId");
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
  salle
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
  salle
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
  salle
    .destroy({ where: { salleId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.params.admin;
        var table = "salle";
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
  salle
    .findOne({ where: { salleId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            type: req.body.description,
            capacite: req.body.capacite,
            departementDepartementId: req.body.departementId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "salle";
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
exports.addCSV = (req, res) => {
  var url = req.file.buffer;
  const stream = Readable.from(url.toString());

  stream
.pipe(csv({delimiter: ';'}))
.on('data', function(row){
  var nom = row['nom;type;capacite;'].split(';')[0];
  var type = row['nom;type;capacite;'].split(';')[1];
  var cap = row['nom;type;capacite;'].split(';')[2];
  var departementId = req.body.departementId;
    try {
      salle
    .create({
      nom: nom,
      type: type,
      capacite: capacite,
      departementDepartementId:departementId,
    })
    .then((data) => {
      var datetime =new Date;
      var admin = req.body.admin;
      var table = "salle";
      var action = "Ajouter";
      var id = data.get("salleId");
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
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
    }
    catch(err) {
        //error handler
        console.log({err});
        res.send(err.toString());

    }
})
.on('end',function(){
    //some final operation
    res.send('sucess');
});
};