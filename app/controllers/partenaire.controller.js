const db = require("../models");
const config = require("../config/auth.config");
const partenaire = db.partenaire;
const formation = db.formation;
const formation_partenaire = db.formation_partenaire;

const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    partenaire.create({
        Nom: req.body.nom,
        type:req.body.type,
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}
exports.getAll=(req, res) =>{
    partenaire.findAll({}).then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    partenaire.findByPk(id,{
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    partenaire.destroy({where : {partenaireId: id}}).then((data) => {
        if (num == 1) {
        res.send({message:'deleted successfully!'});
        }
        else{
            res.send({message:'Cannot delete'});
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}

exports.linkWithformation = (req, res) => {
    partenaire.findByPk(req.body.partenaireId)
      .then((parten) => {
        if (!parten) {
          res.status(500).send('partenaire not found!');
          return null;
        }
        return formation.findByPk(req.body.formationId).then((forma) => {
          if (!forma) {
            res.status(500).send('formation not found!');
            console.log("Tutorial not found!");
            return null;
          }
          formation_partenaire.create({
            formationId:req.body.formationId,
            partenaireId:req.body.partenaireId
          })
          res.send(`linked formation id=${forma.id} to partenaire id=${parten.id}`);
          return parten;
        });
      })
      .catch((err) => {
        res.status(500).send('formation not found!',err);
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
};

exports.RemovelinkWithformation = (req, res) => {
  partenaire.findByPk(req.body.partenaireId)
  .then((etud) => {
      if (!etud) {
        res.status(500).send('outil not found!');
        return null;
      }
      formation_partenaire.destroy({where : {partenaireId: req.body.partenaireId}}).then((data)=>console.log({data})).catch((err)=>console.log({err}));
    })
    .catch((err) => {
      res.status(500).send('salle not found!',err);
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

  exports.getlinkswithformation = (req, res) => {
      var id = req.body.partenaireId;
    partenaire.findAll({where : {partenaireId : id}})
      .then((result) => {
          res.send({result});
      })
      .catch((err) => {
        res.status(500).send('formation not found!',err);
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };

  exports.UpdateOne=(req, res) =>{
    const id = req.params.id;
    partenaire.find({where : {partenaireId: id}}).then((record) => {
        if (record) {
          record.update({
            nom: req.body.nom,
            type:req.body.type,
        }).then((data)=>  {
                res.send({message:'deleted successfully!'});

              }).error(err => res.send({message:'Cannot update'}));
        }
        else{
            res.send({message:'Cannot update'});
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}