const db = require("../models");
const config = require("../config/auth.config");
const enseignant = db.enseignant;
const formation = db.formation;
const enseignant_formation = db.enseignants_formation;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    enseignant.create({
        nom: req.body.nom,
        prenom:req.body.prenom,
        data_naissance:req.body.data_naissance,
        lieu_naissance:req.body.lieu_naissance,
        adresse:req.body.adresse,
        diplome:req.body.diplome,
        grade:req.body.grade,
        adresse:req.body.adresse,
        specialite:req.body.specialite,
        situationSocial:req.body.situationSocial,
        sex:req.body.sex,
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}
exports.getAll=(req, res) =>{
    enseignant.findAll({
    }).then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    enseignant.findByPk(id,{
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    enseignant.destroy({where : {enseignantId: id}}).then((num) => {
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

exports.getLinkWithFormation=(req, res) =>{
  const id = req.params.id;
  enseignant_formation.findAll({where : {enseignantId: id}}).then((result) => {
      res.send({result}); 
  }).catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred"});
  });
}

exports.linkWithformation = (req, res) => {
    enseignant.findByPk(req.body.enseignantId)
      .then((etud) => {
        if (!etud) {
          res.status(500).send('ens not found!');
          return null;
        }
        return formation.findByPk(req.body.formationId).then((niv) => {
          if (!niv) {
            res.status(500).send('formation not found!');
            console.log("Tutorial not found!");
            return null;
          }
          enseignant_formation.create({
            enseignantId:req.body.enseignantId,
            formationId:req.body.formationId
          }).then((result)=>{
            console.log({result});
          });
          res.send(`linked formation id=${niv.id} to ens id=${etud.id}`);
          return etud;
        });
      })
      .catch((err) => {
        res.status(500).send('formation not found!',err);
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };
  exports.UpdateOne=(req, res) =>{
    const id = req.params.id;
    enseignant.find({where : {enseignantId: id}}).then((record) => {
        if (record) {
          record.update({
              nom: req.body.nom,
              prenom:req.body.prenom,
              data_naissance:req.body.data_naissance,
              lieu_naissance:req.body.lieu_naissance,
              adresse:req.body.adresse,
              diplome:req.body.diplome,
              grade:req.body.grade,
              adresse:req.body.adresse,
              specialite:req.body.specialite,
              situationSocial:req.body.situationSocial,
              sex:req.body.sex,                              }).then((data)=>  {
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