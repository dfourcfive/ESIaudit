const db = require("../models");
const config = require("../config/auth.config");
const departement = db.departement;
const Op = db.Sequelize.Op;

exports.add=(req, res) =>{
    departement.create({
        nom: req.body.name,
        description:req.body.description,
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}
exports.getAll=(req, res) =>{
    departement.findAll().then((results) => {

        res.send({ message: "User was registered successfully!"  });
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
    departement.destroy(id).then((data) => {
        if (num == 1) {
        res.send({message:'deleted successfully!'});
        }
        else{
            res.send({message:'Cannot delete'});
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}