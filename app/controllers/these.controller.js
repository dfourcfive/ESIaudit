const db = require("../models");
const config = require("../config/auth.config");
const these = db.these;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    these.create({
        titre: req.body.titre,
        domaine:req.body.domaine,
        date_Lancement:req.body.date_Lancement,
        departementDepartementId:req.body.departementId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    these.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    these.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    these.destroy({where : {theseId: id}}).then((data) => {
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
    these.find({where : {theseId: id}}).then((data) => {
        if (data == 1) {
            these.update({
                titre: req.body.titre,
                domaine:req.body.domaine,
                date_Lancement:req.body.date_Lancement,
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