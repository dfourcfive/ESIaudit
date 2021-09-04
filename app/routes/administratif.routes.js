const { authJwt } = require("../middleware");
const controller = require("../controllers/administratif.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/data/administratifs/:id",
    [authJwt.verifyToken],
    controller.getOne
  );

  app.delete(
    "/api/data/administratifs/:id",
    [authJwt.verifyToken],
    controller.DeleteOne
  );

  app.get("/api/data/administratifs", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/administratifs", [authJwt.verifyToken], controller.add);

  app.post(
    "/api/data/administratifs/:id",
    [authJwt.verifyToken],
    controller.UpdateOne
  );
};
