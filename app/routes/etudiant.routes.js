const { authJwt } = require("../middleware");
const controller = require("../controllers/etudiant.controller");
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/data/etudiants/:id", [authJwt.verifyToken], controller.getOne);

  app.delete(
    "/api/data/etudiants/:id",
    [authJwt.verifyToken],
    controller.DeleteOne
  );
  app.post(
    "/api/data/etudiants/file",
    upload.single('file'),
    controller.addCSV
  );
  app.get("/api/data/etudiants", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/etudiants", [authJwt.verifyToken], controller.add);

  app.post(
    "/api/data/etudiants/:id",
    [authJwt.verifyToken],
    controller.UpdateOne
  );

  //Niveau
  app.post(
    "/api/data/etudiants/niveau",
    [authJwt.verifyToken],
    controller.linkWithNiveau
  );

  app.get(
    "/api/data/etudiants/niveau/:id",
    [authJwt.verifyToken],
    controller.getlinksWithNiveau
  );

  //pfe master
  app.post(
    "/api/data/etudiants/pfemaster",
    [authJwt.verifyToken],
    controller.linkWithPfeMaster
  );

  app.get(
    "/api/data/etudiants/pfemaster/:id",
    [authJwt.verifyToken],
    controller.getlinksWithPfeMaster
  );
};
