const db = require("../../models");

exports.getDataByFk = async (req, res) => {
  var table = req.body.table;
  var fk = req.body.fk;
  console.log(fk);
  var value = req.body.value;
  console.log(value);
  db.sequelize
    .query("SELECT * FROM " + table + ' WHERE "' + fk + '" = ' + value)
    .then((result) => {
      res.send(JSON.stringify(result[0]));
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
