const { authJwt } = require("../middleware");
const controller = require("../controllers/enseignant.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/data/enseignants/:id",
    [authJwt.verifyToken],
    controller.getOne
  );

  app.delete(
    "/api/data/enseignants/:id",
    [authJwt.verifyToken],
    controller.DeleteOne
  );

  app.get("/api/data/enseignants", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/enseignants", [authJwt.verifyToken], controller.add);
  app.post(
    "/api/data/enseignants/:id",
    [authJwt.verifyToken],
    controller.UpdateOne
  );

  //formation
  app.put(
    "/api/data/enseignants",
    [authJwt.verifyToken],
    controller.linkWithformation
  );

  app.get(
    "/api/data/enseignants/formations/:id",
    [authJwt.verifyToken],
    controller.getLinkWithFormation
  );
};
