const db = require("../models");
const config = require("../config/auth.config");
const activite = db.activite;
const Op = db.Sequelize.Op;

exports.add=(req,res) => {
    activite.create({
        titre: req.body.titre,
        type:req.body.type,
        date_debut:req.body.date_debut,
        date_fin:req.body.date_fin,
        salleSalleId:req.body.salleId,
        clubClubId:req.body.clubId
    }).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getAll=(req, res) =>{
    activite.findAll().then((results) => {
        res.send({results});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.getOne=(req, res) =>{
    const id = req.params.id;
    activite.findByPk(id).then((data) => {
        res.send({data});
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Some error occurred"});
    });
}
exports.DeleteOne=(req, res) =>{
    const id = req.params.id;
    activite.destroy({where : {activiteId: id}}).then((data) => {
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
    activite.findOne({where : {activiteId: id}}).then((record) => {
        if (record) {
            record.update({
                titre: req.body.titre,
                type:req.body.type,
                date_debut:req.body.date_debut,
                date_fin:req.body.date_fin,
                salleId:req.body.salleId
                      })
              .then((data)=> {
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
exports.addCsv=async (req, res) => {
    try {
      await uploadFile(req, res);
        
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      //todo here parse csv file and update the table
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });}
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
};