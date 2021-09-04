const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //route for singUp
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  //route for singIn
  app.post("/api/auth/signin", controller.signin);
};
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTg3OTg0LCJleHAiOjE2MjA2NzQzODR9.KAaFAc3EuxbHo2iTORp7tYhCMVZlaui90d0Fo-mFUJs
*/
