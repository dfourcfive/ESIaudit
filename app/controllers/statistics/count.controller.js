const db = require("../../models");

exports.getTotal=async (req, res) => {
    var table = req.body.table;
    db.sequelize.query('SELECT COUNT(*) FROM '+table).then((result) => {
        res.send(JSON.stringify(result[0][0]));
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

