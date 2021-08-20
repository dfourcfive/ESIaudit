const db = require("../models");
const config = require("../config/auth.config");
const etudiant = db.etudiant;
const niveau = db.niveau;
const etudiant_niveau = db.etudiant_niveau;
const pfe_master =db.PfeMaster;
const etudiant_pfe_master =db.etudiant_pfemaster;

const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    etudiant.create({
        nom: req.body.nom,
        prenom:req.body.prenom,
        data_naissance:req.body.data_naissance,
        lieu_naissance:req.body.lieu_naissance,
        adresse:req.body.adresse,
        Sex:req.body.Sex,
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}
exports.getAll=(req, res) =>{
    etudiant.findAll({
    }).then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    etudiant.findByPk(id,{

    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    etudiant.destroy({where : {etudiantId: id}}).then((num) => {
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

exports.linkWithNiveau = (req, res) => {
    etudiant.findByPk(req.body.etudiantId)
      .then((etud) => {
        if (!etud) {
          res.status(500).send('etudiant not found!');
          return null;
        }
        return niveau.findByPk(req.body.niveauId).then((niv) => {
          if (!niv) {
            res.status(500).send('Niveau not found!');
            return null;
          }
          etudiant_niveau.create({
            etudiantId:req.body.etudiantId,
            niveauId:req.body.niveauId
          }).then((result)=>console.log({result}));   
           res.send(`linked niveau id=${niv.id} to etudiant id=${etud.id}`);
          return etud;
        });
      })
      .catch((err) => {
        res.status(500).send('niveau not found!',err);
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };
  exports.getlinksWithNiveau = (req, res) => {
    const id = req.params.id;
    etudiant_niveau.findAll({
        where: {
            etudiantId: id
          }
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
  };
  exports.linkWithPfeMaster = (req, res) => {
    etudiant.findByPk(req.body.etudiantId)
      .then((etud) => {
        if (!etud) {
          res.status(500).send('etudiant not found!');
          return null;
        }
        return pfe_master.findByPk(req.body.PfeMasterId).then((niv) => {
          if (!niv) {
            res.status(500).send('Niveau not found!');
            return null;
          }
          etudiant_pfe_master.create({
            etudiantId:req.body.etudiantId,
            PfeMasterId:req.body.PfeMasterId
          }).then((result)=>console.log({result}));   
           res.send(`linked niveau id=${niv.id} to etudiant id=${etud.id}`);
          return etud;
        });
      })
      .catch((err) => {
        res.status(500).send('niveau not found!',err);
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };
  exports.getlinksWithPfeMaster = (req, res) => {
    const id = req.params.id;
    etudiant_pfe_master.findAll({
        where: {
            etudiantId: id
          }
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
  };

 
  exports.UpdateOne=(req, res) =>{
    const id = req.params.id;
    etudiant.find({where : {etudiantId: id}}).then((record) => {
        if (record) {
          record.update({
            nom: req.body.nom,
            prenom:req.body.prenom,
            data_naissance:req.body.data_naissance,
            lieu_naissance:req.body.lieu_naissance,
            adresse:req.body.adresse,
            Sex:req.body.Sex,}).then((data)=>  {
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