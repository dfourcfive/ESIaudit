const db = require("../models");
const config = require("../config/auth.config");
const administratif = db.administratif;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    administratif.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        type:req.body.description,
        data_de_naissance:req.body.date_de_naissance,
        lieu_naissance:req.body.lieu_naissance,
        adresse:req.body.adresse,
        diplome:req.body.diplome,
        specialite:req.body.specialite,
        role:req.body.role,
        sex:req.body.sex,
        departementDepartementId:req.body.departementId
        }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    administratif.findAll().then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    administratif.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    administratif.destroy({where : {administratifId: id}}).then((data) => {
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

exports.UpdateOne=(req, res) =>{
    const id = req.params.id;
    administratif.find({where : {administratifId: id}}).then((record) => {
        if (record) {
            record.update({
                nom: req.body.nom,
                prenom: req.body.prenom,
                type:req.body.description,
                data_de_naissance:req.body.data_de_naissance,
                lieu_naissance:req.body.lieu_naissance,
                adresse:req.body.adresse,
                diplome:req.body.diplome,
                specialite:req.body.specialite,
                role:req.body.role,
                sex:req.body.sex,
                departementId:req.body.departementId
                })
              .then((data)=>  {
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
