const db = require("../models");
const config = require("../config/auth.config");
const DelibModule = db.DelibModule;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    DelibModule.create({
        annee: req.body.annee,
        Moyenne:req.body.Moyenne,
        Coefficient:req.body.Coefficient,
        Credit:req.body.Credit,
        etudiantEtudiantId:req.body.etudiantId,
        matiereMatiereId:req.body.matiereId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}
exports.getAll=(req, res) =>{
    DelibModule.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    DelibModule.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    DelibModule.destroy({where : {DelibModuleId: id}}).then((data) => {
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
    DelibModule.findOne({where : {DelibModuleId: id}}).then((record) => {
        if (record) {
            record.update({
                annee: req.body.annee,
                Moyenne:req.body.Moyenne,
                Coefficient:req.body.Coefficient,
                Credit:req.body.Credit,
                etudiantEtudiantId:req.body.etudiantId,
                matiereMatiereId:req.body.matiereId
                }).then((data)=>  {
                res.send({message:'deleted successfully!'});

              });
        }
        else{
            res.send({message:'Cannot update'});
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}