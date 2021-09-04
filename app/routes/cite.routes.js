const { authJwt } = require("../middleware");
const controller = require("../controllers/cite.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/data/cites/:id", [authJwt.verifyToken], controller.getOne);

  app.delete(
    "/api/data/cites/:id",
    [authJwt.verifyToken],
    controller.DeleteOne
  );

  app.get("/api/data/cites", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/cites", [authJwt.verifyToken], controller.add);

  app.post("/api/data/cites/:id", [authJwt.verifyToken], controller.UpdateOne);

  //links with etudiants
  app.post(
    "/api/data/cites/etudiants",
    [authJwt.verifyToken],
    controller.linkWithEtudiant
  );

  app.get(
    "/api/data/cites/etudiants/:id",
    [authJwt.verifyToken],
    controller.getlinksWithEtudiants
  );
};
