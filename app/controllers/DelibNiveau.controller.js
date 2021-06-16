const db = require("../models");
const config = require("../config/auth.config");
const DelibNiveau = db.DelibNiveau;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    DelibNiveau.create({
        année: req.body.année,
        MoyenneS1:req.body.MoyenneS1,
        MoyenneS2:req.body.MoyenneS2,
        CreditS1:req.body.CreditS1,
        CreditS2:req.body.CreditS2,
        Observation:req.body.Observation,
        etudiantEtudiantId:req.body.etudiantId,
        niveauNiveauId:req.body.niveauId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    DelibNiveau.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    DelibNiveau.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    DelibNiveau.destroy({where : {DelibNiveauId: id}}).then((data) => {
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
    DelibNiveau.find({where : {DelibNiveauId: id}}).then((data) => {
        if (data == 1) {
            DelibNiveau.update({
                année: req.body.année,
                MoyenneS1:req.body.MoyenneS1,
                MoyenneS2:req.body.MoyenneS2,
                CreditS1:req.body.CreditS1,
                CreditS2:req.body.CreditS2,
                Observation:req.body.Observation,
                etudiantId:req.body.etudiantId,
                niveauNiveauId:req.body.niveauId
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