const db = require("../models");
const config = require("../config/auth.config");
const ue = db.ue;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");
const csv = require('csv-parser');
const { Readable } = require('stream');

exports.add = (req, res) => {
  ue.create({
    nom: req.body.nom,
    type: req.body.type,
    Coefficient: req.body.Coefficient,
    credit: req.body.credit,
    ChargeHoraire: req.body.ChargeHoraire,
    semestreSemestreId: req.body.semestreId,
  })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "ue";
      var action = "Ajouter";
      var id = data.get("ueId");
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
  ue.findAll()
    .then((results) => {
      res.send({ results });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getOne = (req, res) => {
  const id = req.params.id;
  ue.findByPk(id)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.DeleteOne = (req, res) => {
  const id = req.params.id;
  ue.destroy({ where: { ueId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime =new Date;
        var admin = req.body.admin;
        var table = "ue";
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
  ue.findOne({ where: { ueId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            type: req.body.type,
            Coefficient: req.body.Coefficient,
            credit: req.body.credit,
            ChargeHoraire: req.body.ChargeHoraire,
            semestreSemestreId: req.body.semestreId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "ue";
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
  var nom = row['nom;type;Coefficient;credit;ChargeHoraire'].split(';')[0];
  var type = row['nom;type;Coefficient;credit;ChargeHoraire'].split(';')[1];
  var Coefficient = row['nom;type;Coefficient;credit;ChargeHoraire'].split(';')[2];
  var credit = row['nom;type;Coefficient;credit;ChargeHoraire'].split(';')[3];
  var ChargeHoraire = row['nom;type;Coefficient;credit;ChargeHoraire'].split(';')[4];
    try {
      ue
    .create({
      nom: nom,
      type: type,
      Coefficient: Coefficient,
      credit:credit,
      ChargeHoraire:ChargeHoraire,
      semestreSemestreId: req.body.semestreId,
    })
    .then((data) => {
      var datetime =new Date;
      var admin = req.body.admin;
      var table = "ue";
      var action = "Ajouter";
      var id = data.get("ueId");
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