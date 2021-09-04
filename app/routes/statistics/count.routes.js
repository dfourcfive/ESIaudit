const { authJwt } = require("../../middleware");
const controller = require("../../controllers/statistics/count.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/stats/count", [authJwt.verifyToken], controller.getTotal);
  app.post(
    "/api/stats/countWhere",
    [authJwt.verifyToken],
    controller.getTotalByFk
  );
};
