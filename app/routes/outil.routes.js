const { authJwt } = require("../middleware");
const controller = require("../controllers/outil.controller");
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

  app.get("/api/data/outils/:id", [authJwt.verifyToken], controller.getOne);

  app.delete(
    "/api/data/outils/:id/:admin",
    [authJwt.verifyToken],
    controller.DeleteOne
  );

  app.post(
    "/api/data/outils/file",
    upload.single('file'),
    controller.addCSV
  );

  app.get("/api/data/outils", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/outils", [authJwt.verifyToken], controller.add);

  app.post("/api/data/outils/:id", [authJwt.verifyToken], controller.UpdateOne);
  //with salles

  app.put(
    "/api/data/outils/salles",
    [authJwt.verifyToken],
    controller.linkWithSalle
  );
  app.delete(
    "/api/data/outils/salles",
    [authJwt.verifyToken],
    controller.RemovelinkWithSalle
  );

  app.get(
    "/api/data/outils/salles/:id",
    [authJwt.verifyToken],
    controller.getlinks
  );

 
};
