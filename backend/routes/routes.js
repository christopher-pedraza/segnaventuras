const niveles = require("../controllers/nivel.js");
const parteVideo = require("../controllers/parteVideo.js");
const isla = require("../controllers/isla.js");
const miembro = require("../controllers/miembro.js");
const preguntaVideo = require("../controllers/preguntaVideo.js");

const express = require("express");
const router = express.Router();

// router.use("/miembros", require("./routes_miembros.js"));
// router.use("/categorias", require("./routes_categorias.js"));
// router.use("/palabras", require("./routes_palabras.js"));
// router.use("/quiz", require("./routes_quiz.js"));
// router.use("/nivel", require("./routes_nivel.js"));
// router.use("/treasure", require("./routes_treasure_hunt.js"));
// router.use("/modelo", require("./routes_modelo_coml.js"));
// router.use("/videos", require("./routes_video_cuestionario.js"));
// router.use("/progreso", require("./routes_progreso.js"));

router.use("/niveles", niveles);
router.use("/parteVideo", parteVideo);
router.use("/isla", isla);
router.use("/miembro", miembro);
router.use("/preguntaVideo", preguntaVideo);

module.exports = router;
