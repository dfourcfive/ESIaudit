const db = require("../models");
const config = require("../config/auth.config");
const partenaire = db.partenaire;
const formation = db.formation;

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
    partenaire.findAll({
        include: [
            {
              model: formation,
              attributes: ['formationId','nom','description'],
              through: {
                attributes: [],
              }
            },
          ],
    }).then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    partenaire.findByPk(id,{
        include: [
            {
              model: formation,
              attributes: ['formationId','nom','description'],
              through: {
                attributes: [],
              }
            },
          ],
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
          parten.addformation(forma);
          res.send(`linked formation id=${forma.id} to partenaire id=${parten.id}`);
          return parten;
        });
      })
      .catch((err) => {
        res.status(500).send('formation not found!',err);
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };

  exports.UpdateOne=(req, res) =>{
    const id = req.params.id;
    partenaire.find({where : {partenaireId: id}}).then((data) => {
        if (data == 1) {
          partenaire.update({
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