const db = require("../models");
const config = require("../config/auth.config");
const etudiant = db.etudiant;
const niveau = db.niveau;
const etudiant_niveau = db.etudiant_niveau;
const pfe_master = db.PfeMaster;
const etudiant_pfe_master = db.etudiant_pfemaster;
const produce = require("../../app/kafkaClient/producer");

const csv = require('csv-parser');
const { Readable } = require('stream');

const Op = db.Sequelize.Op;

exports.add = (req, res) => {
  etudiant
    .create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      data_naissance: req.body.data_naissance,
      lieu_naissance: req.body.lieu_naissance,
      adresse: req.body.adresse,
      Sex: req.body.Sex,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "etudiant";
      var action = "Ajouter";
      var id = data.get("etudiantId");
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
  etudiant
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
  etudiant
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
  etudiant
    .destroy({ where: { etudiantId: id } })
    .then((num) => {
      if (num == 1) {
        var datetime = new Date;
        var admin = req.params.admin;
        var table = "etudiant";
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

exports.linkWithNiveau = (req, res) => {
  etudiant
    .findByPk(req.body.etudiantId)
    .then((etud) => {
      if (!etud) {
        res.status(500).send("etudiant not found!");
        return null;
      }
      return niveau.findByPk(req.body.niveauId).then((niv) => {
        if (!niv) {
          res.status(500).send("Niveau not found!");
          return null;
        }
        etudiant_niveau
          .create({
            etudiantId: req.body.etudiantId,
            niveauId: req.body.niveauId,
          })
          .then((result) => console.log({ result }));
        res.send(`linked niveau id=${niv.id} to etudiant id=${etud.id}`);
        return etud;
      });
    })
    .catch((err) => {
      res.status(500).send("niveau not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};
exports.getlinksWithNiveau = (req, res) => {
  const id = req.params.id;
  etudiant_niveau
    .findAll({
      where: {
        etudiantId: id,
      },
    })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.linkWithPfeMaster = (req, res) => {
  etudiant
    .findByPk(req.body.etudiantId)
    .then((etud) => {
      if (!etud) {
        res.status(500).send("etudiant not found!");
        return null;
      }
      return pfe_master.findByPk(req.body.PfeMasterId).then((niv) => {
        if (!niv) {
          res.status(500).send("Niveau not found!");
          return null;
        }
        etudiant_pfe_master
          .create({
            etudiantId: req.body.etudiantId,
            PfeMasterId: req.body.PfeMasterId,
          })
          .then((result) => console.log({ result }));
        res.send(`linked niveau id=${niv.id} to etudiant id=${etud.id}`);
        return etud;
      });
    })
    .catch((err) => {
      res.status(500).send("niveau not found!", err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};
exports.getlinksWithPfeMaster = (req, res) => {
  const id = req.params.id;
  etudiant_pfe_master
    .findAll({
      where: {
        etudiantId: id,
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
  etudiant
    .findOne({ where: { etudiantId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            prenom: req.body.prenom,
            data_naissance: req.body.data_naissance,
            lieu_naissance: req.body.lieu_naissance,
            adresse: req.body.adresse,
            Sex: req.body.Sex,
          })
          .then((data) => {
            var datetime = new Date;
            var admin = req.body.admin;
            var table = "etudiant";
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
  var nom = row['nom;prenom;date_naissance;lieu_naissance;adresse;Sex;'].split(';')[0];
  var prenom = row['nom;prenom;date_naissance;lieu_naissance;adresse;Sex;'].split(';')[1];
  var date_naissance = row['nom;prenom;date_naissance;lieu_naissance;adresse;Sex;'].split(';')[2];
  var lieu_de_nissance = row['nom;prenom;date_naissance;lieu_naissance;adresse;Sex;'].split(';')[3];
  var adresse = row['nom;prenom;date_naissance;lieu_naissance;adresse;Sex;'].split(';')[4];
  var Sex = row['nom;prenom;date_naissance;lieu_naissance;adresse;Sex;'].split(';')[5];

  var departementId = req.body.departementId;
    try {
      etudiant
    .create({
      nom: nom,
      prenom: prenom,
      date_naissance: date_naissance,
      lieu_naissance:lieu_naissance,
      adresse:adresse,
      Sex:Sex,
    })
    .then((data) => {
      var datetime =new Date;
      var admin = req.body.admin;
      var table = "doctorant";
      var action = "Ajouter";
      var id = data.get("etudiantId");
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