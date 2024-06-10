const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller_miembros.js");

// Rutas disponibles y las funciones que se llaman
router.get("/getAll", controller.getAll);
router.get("/get/:id", controller.get);
router.post("/add", controller.add);
router.delete("/remove/:id", controller.remove);
router.put("/update/:id", controller.update);
router.post("/login", controller.login);
router.post("/loginWeb", controller.loginWeb);
router.post("/authToken", controller.authToken);

module.exports = router;
