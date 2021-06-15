const db = require("../models");
const config = require("../config/auth.config");
const matiere = db.matiere;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    matiere.create({
        nom: req.body.nom,
        type:req.body.type,
        Coefficient:req.body.Coefficient,
        credit:req.body.credit,
        ChargeHoraire:req.body.ChargeHoraire,
        ueUeId:req.body.ueId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    matiere.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    ue.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    matiere.destroy({where : {matiereId: id}}).then((data) => {
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
    matiere.find({where : {matiereId: id}}).then((data) => {
        if (data == 1) {
            matiere.update({
                nom: req.body.nom,
                type:req.body.type,
                Coefficient:req.body.Coefficient,
                credit:req.body.credit,
                ChargeHoraire:req.body.ChargeHoraire,
                ueUeId:req.body.ueId            }).then((data)=>  {
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