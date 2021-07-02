const db = require("../models");
const config = require("../config/auth.config");
const niveau = db.niveau;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    niveau.create({
        nom: req.body.nom,
        desc:req.body.desc,
        Durée:req.body.Durée,
        formationFormationId:req.body.formationId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    niveau.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    niveau.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    niveau.destroy({where : {niveauId: id}}).then((data) => {
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
    niveau.find({where : {niveauId: id}}).then((data) => {
        if (data == 1) {
            niveau.update({
                titre: req.body.titre,
                desc:req.body.desc,
                Durée:req.body.Durée,
                formationFormationId:req.body.formationId                    }).then((data)=> {
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