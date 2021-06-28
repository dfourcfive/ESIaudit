const bi_db_data = require("../../BI/bi_db_data.js");

exports.getTotal=async (req, res) => {
    var table = req.body.table;
    db.sequelize.query('SELECT COUNT(*) FROM '+table).then((result) => {
        res.send(JSON.stringify(result[0][0]));
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

exports.getTotalByFk=async (req, res) => {
    var table = req.body.table;
    var fk = req.body.fk;
    var value = req.body.value;
    db.sequelize.query('SELECT COUNT(*) FROM '+table+' WHERE "'+fk+'" = '+value).then((result) => {
        res.send(JSON.stringify(result[0][0]));
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}