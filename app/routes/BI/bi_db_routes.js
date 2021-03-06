const { authJwt } = require("../../middleware");
const controller = require("../../controllers/BI/bi_db.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/bi/dim_data",
    [authJwt.verifyToken],
    controller.getDimTablesData
  );
  app.get(
    "/api/bi/fact_data",
    [authJwt.verifyToken],
    controller.getFactTablesData
  );
};
