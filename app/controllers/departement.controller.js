const db = require("../models");
const config = require("../config/auth.config");
const departement = db.departement;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    departement.create({
        nom: req.body.nom,
        description:req.body.description,
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}
exports.getAll=(req, res) =>{
    departement.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    departement.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    departement.destroy({where : {departementId: id}}).then((data) => {
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
    departement.find({where : {departementId: id}}).then((data) => {
        if (data == 1) {
            departement.update({
                nom: req.body.nom,
                description:req.body.description,
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