const { authJwt } = require("../middleware");
const controller = require("../controllers/DelibNiveau.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/data/DelibNiveaux/:id",
    [authJwt.verifyToken],
    controller.getOne
  );

  app.delete(
    "/api/data/DelibNiveaux/:id",
    [authJwt.verifyToken],
    controller.DeleteOne
  );

  app.get("/api/data/DelibNiveaux", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/DelibNiveaux", [authJwt.verifyToken], controller.add);
  app.post(
    "/api/data/DelibNiveaux/:id",
    [authJwt.verifyToken],
    controller.UpdateOne
  );
};
