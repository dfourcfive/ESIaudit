const db = require("../models");
const config = require("../config/auth.config");
const doctorant = db.doctorant;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    doctorant.create({
        nom: req.body.nom,
        prenom:req.body.prenom,
        date_naissance:req.body.date_naissance,
        lieu_de_nissance:req.body.lieu_de_nissance,
        adresse:req.body.adresse,
        sex:req.body.sex,
        departementDepartementId:req.body.departementId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    doctorant.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    doctorant.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    doctorant.destroy({where : {activiteId: id}}).then((data) => {
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
    doctorant.find({where : {doctorantId: id}}).then((data) => {
        if (data == 1) {
            doctorant.update({
                nom: req.body.nom,
                prenom:req.body.prenom,
                date_naissance:req.body.date_naissance,
                lieu_de_nissance:req.body.lieu_de_nissance,
                adresse:req.body.adresse,
                sex:req.body.sex,
                departementDepartementId:req.body.departementId
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