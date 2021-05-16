const db = require("../models");
const config = require("../config/auth.config");
const etudiant = db.etudiant;
const niveau = db.niveau;

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
        include: [
            {
              model: niveau,
              attributes: ['niveauId','titre','desc','Durée'],
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
    etudiant.findByPk(id,{
        include: [
            {
              model: niveau,
              attributes: ['niveauId','titre','desc','Durée'],
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
    etudiant.destroy({where : {etudiantId: id}}).then((data) => {
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
    etudiant.findByPk(req.body.etudiantId)
      .then((etud) => {
        if (!etud) {
          res.status(500).send('partenaire not found!');
          return null;
        }
        return niveau.findByPk(req.body.niveauId).then((niv) => {
          if (!niv) {
            res.status(500).send('formation not found!');
            console.log("Tutorial not found!");
            return null;
          }
          etud.addformation(niv);
          res.send(`linked formation id=${niv.id} to partenaire id=${etud.id}`);
          return etud;
        });
      })
      .catch((err) => {
        res.status(500).send('formation not found!',err);
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };