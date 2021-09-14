const db = require("../models");
const config = require("../config/auth.config");
const outil = db.outil;
const salle = db.salle;
const outil_salle = db.outil_salle;
const Op = db.Sequelize.Op;

const csv = require('csv-parser');
const { Readable } = require('stream');

const produce = require("../../app/kafkaClient/producer");

exports.add = (req, res) => {
  outil
    .create({
      titre: req.body.titre,
      type: req.body.type,
      salleSalleId: req.body.salleId,
    })
    .then((data) => {
      var datetime =new Date;
      var admin = req.body.admin;
      var table = "outil";
      var action = "Ajouter";
      var id = data.get("outilId");
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
  outil
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
  outil
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
  outil
    .destroy({ where: { outilId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.params.admin;
        var table = "outil";
        var action = "Supprimer";
        var id = data.get("outilId");
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

exports.linkWithSalle = (req, res) => {
  outil
    .findByPk(req.body.outilId)
    .then((etud) => {
      if (!etud) {
        res.status(500).send("outil not found!");
        return null;
      }
      return salle.findByPk(req.body.salleId).then((niv) => {
        if (!niv) {
          res.status(500).send("salle not found!");
          return null;
        }
        outil_salle
          .create({
            outilId: req.body.outilId,
            salleId: req.body.salleId,
            quantity: req.body.quantity,
          })
          .then((result) => console.log({ result }));
        res.send(`linked outil id=${niv.id} to salle id=${etud.id}`);
        return etud;
      });
    })
    .catch((err) => {
      res.status(500).send("salle not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};
exports.RemovelinkWithSalle = (req, res) => {
  outil
    .findByPk(req.body.outilId)
    .then((etud) => {
      if (!etud) {
        res.status(500).send("outil not found!");
        return null;
      }
      outil_salle
        .destroy({ where: { outilId: req.body.outilId } })
        .then((data) => console.log({ data }))
        .catch((err) => console.log({ err }));
    })
    .catch((err) => {
      res.status(500).send("salle not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

exports.getlinks = (req, res) => {
  const id = req.params.id;
  outil_salle
    .findAll({
      where: {
        salleId: id,
      },
    })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.UpdateOne = (req, res) => {
  const id = req.params.id;
  outil
    .findOne({ where: { outilId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            titre: req.body.titre,
            type: req.body.type,
            salleSalleId: req.body.salleId,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "outil";
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
  var id_salle = 10;
  var url = req.file.buffer;
  const stream = Readable.from(url.toString());

  stream
.pipe(csv({delimiter: ';'}))
.on('data', function(row){
  var titre = row['titre;type;'].split(';')[0];
  var type = row['titre;type;'].split(';')[1];
    try {
        outil
    .create({
      titre: titre,
      type: type,
    })
    .then((data) => {
      var datetime =new Date;
      var admin = req.body.admin;
      var table = "outil";
      var action = "Ajouter";
      var id = data.get("outilId");
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