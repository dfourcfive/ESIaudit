const db = require("../models");
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;
const partenaire = db.partenaire;
const formation = db.formation;
const formation_partenaire = db.formation_partenaire;

exports.add=(req, res) =>{
    formation.create({
        nom: req.body.nom,
        description:req.body.description,
        departementDepartementId:req.body.departementId,
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}
exports.getAll=(req, res) =>{
    formation.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    formation.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    formation.destroy({where : {formationId: id}}).then((data) => {
        if (data == 1) {
        res.send({message:'deleted successfully!'});
        }
        else{
            res.send({message:'Cannot delete'});
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.linkWithPartenaire = (req, res) => {
    formation.findByPk(req.body.formationId)
      .then((parten) => {
        if (!parten) {
          res.status(500).send('partenaire not found!');
          return null;
        }
        return partenaire.findByPk(req.body.partenaireId).then((forma) => {
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
  
  exports.getlinkswithformation = (req, res) => {
    var id = req.body.formationId;
  formation.findAll({where : {formationId : id}})
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
    formation.find({where : {formationId: id}}).then((record) => {
        if (record) {
            record.update({
            nom: req.body.nom,
            description:req.body.description,
            departementDepartementId:req.body.departementId,
    }).then((data)=> {
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