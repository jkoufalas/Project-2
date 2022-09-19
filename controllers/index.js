//import modular routs
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

//setup modular route paths
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
