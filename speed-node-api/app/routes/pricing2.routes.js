const { authJwt } = require("../middleware");
const checkRole = require("../middleware/verifyrole");

const controller = require("../controllers/pricing2.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

  app.get("/api/pricing2/all",[authJwt.verifyToken], controller.getAllPricings2);
  app.get("/api/pricing2/:id",[authJwt.verifyToken], controller.getSinglePricing2);
  app.post('/api/pricing2',   [authJwt.verifyToken, authJwt.isAdmin], controller.createPricing2);
  app.put('/api/pricing2/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.updatePricing2);
  app.delete('/api/pricing2/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.deletePricing2);
};