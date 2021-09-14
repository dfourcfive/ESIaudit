const { authJwt } = require("../middleware");
const controller = require("../controllers/formation.controller");
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

  app.get("/api/data/formations/:id", [authJwt.verifyToken], controller.getOne);

  app.delete(
    "/api/data/formations/:id",
    [authJwt.verifyToken],
    controller.DeleteOne
  );

  app.get("/api/data/formations", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/formations", [authJwt.verifyToken], controller.add);

  app.post(
    "/api/data/formations/file",
    upload.single('file'),
    controller.addCSV
  );

  app.post(
    "/api/data/formations/:id",
    [authJwt.verifyToken],
    controller.UpdateOne
  );
  //getlinkswithformation
  app.get(
    "/api/data/formations/partenaires/:id",
    [authJwt.verifyToken],
    controller.getlinkswithformation
  );
  app.delete(
    "/api/data/formations/partenaires",
    [authJwt.verifyToken],
    controller.RemovelinkWithPartenaire
  );

  app.put(
    "/api/data/formation",
    [authJwt.verifyToken],
    controller.linkWithPartenaire
  );
};
