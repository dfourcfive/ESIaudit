const db = require("../models");
const config = require("../config/auth.config");
const salle = db.salle;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    salle.create({
        nom: req.body.nom,
        type:req.body.description,
        capacite:req.body.capacite,
        departementDepartementId:req.body.departementId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    salle.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    salle.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    salle.destroy({where : {salleId: id}}).then((data) => {
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
    salle.find({where : {salleId: id}}).then((record) => {
        if (record) {
            record.update({
                nom: req.body.nom,
                type:req.body.description,
                capacite:req.body.capacite,
                departementDepartementId:req.body.departementId
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