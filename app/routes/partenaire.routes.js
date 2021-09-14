const { authJwt } = require("../middleware");
const controller = require("../controllers/partenaire.controller");
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

  app.get(
    "/api/data/partenaires/:id",
    [authJwt.verifyToken],
    controller.getOne
  );

  app.delete(
    "/api/data/partenaires/:id/:admin",
    [authJwt.verifyToken],
    controller.DeleteOne
  );
  app.post(
    "/api/data/partenaires/file",
    upload.single('file'),
    controller.addCSV
  );
  app.get("/api/data/partenaires", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/partenaire", [authJwt.verifyToken], controller.add);
  app.post(
    "/api/data/partenaires/:id",
    [authJwt.verifyToken],
    controller.UpdateOne
  );
  //getlinkswithformation
  app.get(
    "/api/data/partenaire/formations/:id",
    [authJwt.verifyToken],
    controller.getlinkswithformation
  );
  app.delete(
    "/api/data/partenaire/formations",
    [authJwt.verifyToken],
    controller.RemovelinkWithformation
  );

  app.put(
    "/api/data/partenaire",
    [authJwt.verifyToken],
    controller.linkWithformation
  );
};
