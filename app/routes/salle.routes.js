const { authJwt } = require("../middleware");
const controller = require("../controllers/salle.controller");
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

  app.get("/api/data/salles/:id", [authJwt.verifyToken], controller.getOne);

  app.delete(
    "/api/data/salles/:id",
    [authJwt.verifyToken],
    controller.DeleteOne
  );
  app.post(
    "/api/data/salles/file",
    upload.single('file'),
    controller.addCSV
  );
  app.get("/api/data/salles", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/salles", [authJwt.verifyToken], controller.add);

  app.post("/api/data/salles/:id", [authJwt.verifyToken], controller.UpdateOne);
};
