const { authJwt } = require("../middleware");
const controller = require("../controllers/etudiant.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/data/etudiants/:id",[authJwt.verifyToken],controller.getOne);

  app.delete("/api/data/etudiants/:id",[authJwt.verifyToken],controller.DeleteOne);

  app.get("/api/data/etudiants",[authJwt.verifyToken],controller.getAll);

  app.post("/api/data/etudiants",[authJwt.verifyToken],controller.add);
  app.put("/api/data/etudiants",[authJwt.verifyToken],controller.linkWithformation);
};
