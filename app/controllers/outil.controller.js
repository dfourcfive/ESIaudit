const db = require("../models");
const config = require("../config/auth.config");
const outil = db.outil;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    outil.create({
        titre: req.body.titre,
        type:req.body.type,
        salleId:req.body.salleId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    outil.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    outil.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    outil.destroy({where : {outilId: id}}).then((data) => {
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
    outil.find({where : {outilId: id}}).then((data) => {
        if (data == 1) {
            outil.update({
                titre: req.body.titre,
        type:req.body.type,
        salleId:req.body.salleId
    }).success(function () {
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