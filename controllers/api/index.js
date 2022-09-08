const router = require("express").Router();
const threadsRoutes = require("./threadsRoutes");
const threadRoutes = require("./threadRoutes");
const categoryRoutes = require("./categoryRoutes");

router.use("/threads", threadsRoutes);
router.use("/thread", threadRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
