const { authJwt } = require("../middleware");
const controller = require("../controllers/ue.controller");
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

  app.get("/api/data/ues/:id", [authJwt.verifyToken], controller.getOne);
  app.post(
    "/api/data/ues/file",
    upload.single('file'),
    controller.addCSV
  );
  app.delete("/api/data/ues/:id/:admin", [authJwt.verifyToken], controller.DeleteOne);

  app.get("/api/data/ues", [authJwt.verifyToken], controller.getAll);

  app.post("/api/data/ues", [authJwt.verifyToken], controller.add);

  app.post("/api/data/ues/:id", [authJwt.verifyToken], controller.UpdateOne);
};
