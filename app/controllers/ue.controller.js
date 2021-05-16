const db = require("../models");
const config = require("../config/auth.config");
const ue = db.ue;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    ue.create({
        nom: req.body.nom,
        type:req.body.type,
        Coefficient:req.body.Coefficient,
        credit:req.body.credit,
        ChargeHoraire:req.body.ChargeHoraire,
        semestreId:req.body.semestreId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    ue.findAll().then((results) => {
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
    ue.destroy({where : {ueId: id}}).then((data) => {
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
