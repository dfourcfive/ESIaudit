const { authJwt } = require("../middleware");
const controller = require("../controllers/DelibModule.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/data/DelibModules/:id",[authJwt.verifyToken],controller.getOne);
  app.get("/api/data/DelibModules/:id/:mid",[authJwt.verifyToken],controller.getByMatIdAndEtudId);

  app.delete("/api/data/DelibModules/:id",[authJwt.verifyToken],controller.DeleteOne);

  app.get("/api/data/DelibModules",[authJwt.verifyToken],controller.getAll);
  app.get("/api/data/DelibModules/etudiant/:id",[authJwt.verifyToken],controller.getBDelibsByEtudiantId);

  app.post("/api/data/DelibModules",[authJwt.verifyToken],controller.add);
  app.post("/api/data/DelibModules/:id",[authJwt.verifyToken],controller.UpdateOne);


};
