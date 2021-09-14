const db = require("../models");
const config = require("../config/auth.config");
const administratif = db.administratif;
const Op = db.Sequelize.Op;
const produce = require("../../app/kafkaClient/producer");
const csv = require('csv-parser');
const { Readable } = require('stream');

exports.add = (req, res) => {
  administratif
    .create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      type: req.body.description,
      data_de_naissance: req.body.date_de_naissance,
      lieu_naissance: req.body.lieu_naissance,
      adresse: req.body.adresse,
      diplome: req.body.diplome,
      specialite: req.body.specialite,
      role: req.body.role,
      sex: req.body.sex,
      departementDepartementId: req.body.departementId,
    })
    .then((data) => {
      var datetime = new Date;
      var admin = req.body.admin;
      var table = "administratif";
      var action = "Ajouter";
      var id = data.get("administratifId");
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
  administratif
    .findAll()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
exports.getOne = (req, res) => {
  const id = req.params.id;
  administratif
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
  administratif
    .destroy({ where: { administratifId: id } })
    .then((data) => {
      if (data == 1) {
        var datetime = new Date;
        var admin = req.params.admin;
        var table = "administratif";
        var action = "Supprimer";
        var id = data.get("administratifId");
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
  administratif
    .findOne({ where: { administratifId: id } })
    .then((record) => {
      if (record) {
        record
          .update({
            nom: req.body.nom,
            prenom: req.body.prenom,
            type: req.body.description,
            data_de_naissance: req.body.data_de_naissance,
            lieu_naissance: req.body.lieu_naissance,
            adresse: req.body.adresse,
            diplome: req.body.diplome,
            specialite: req.body.specialite,
            role: req.body.role,
            sex: req.body.sex,
            departementId: req.body.departementId,
          })
          .then((data) => {
            var datetime =  new Date;
            var admin = req.body.admin;
            var table = "administratif";
            var action = "Modifier";
            var id = data.get("administratifId");
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
  var nom = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[0];
  var prenom = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[1];
  var type = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[2];
  var data_de_naissance = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[3];
  var lieu_naissance = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[4];
  var adresse = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[5];
  var diplome = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[6];
  var specialite = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[7];
  var role = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[8];
  var sex = row['nom;prenom;type;data_de_naissance;lieu_naissance;adresse;diplome;specialite;role;sex;'].split(';')[9];
  try {
      administratif
    .create({
      nom: nom,
      prenom:prenom,
      type:type,
      data_de_naissance:data_de_naissance,
      lieu_naissance:lieu_naissance,
      adresse:adresse,
      diplome:diplome,
      specialite:specialite,
      role:role,
      sex:sex,
      departementId: req.body.departementId,
    })
    .then((data) => {
      var datetime =new Date;
      var admin = req.body.admin;
      var table = "administratif";
      var action = "Ajouter";
      var id = data.get("administratifId");
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