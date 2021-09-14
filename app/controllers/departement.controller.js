const db = require("../models");
const config = require("../config/auth.config");
const departement = db.departement;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");
const csv = require('csv-parser');
const { Readable } = require('stream');

exports.add = (req, res) => {
  departement
    .create({
      nom: req.body.nom,
      description: req.body.description,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "departement";
      var action = "Ajouter";
      var id = data.get("departementId");
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
  departement
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
  departement
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
  departement
    .destroy({ where: { departementId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
      var admin = req.body.admin;
      var table = "departement";
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
  departement
    .findOne({ where: { departementId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            description: req.body.description,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "departement";
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
            res.send({ message: "updated successfully!" });
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
  var nom = row['nom;description;'].split(';')[0];
  var description = row['nom;description;'].split(';')[1];
    try {
      departement
    .create({
      nom: nom,
      description:description,
    })
    .then((data) => {
      var datetime =new Date;
      var admin = req.body.admin;
      var table = "departement";
      var action = "Ajouter";
      var id = data.get("departementId");
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