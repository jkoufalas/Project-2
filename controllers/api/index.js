const router = require("express").Router();
const threadsRoutes = require("./threadsRoutes");
const threadRoutes = require("./threadRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");

router.use("/threads", threadsRoutes);
router.use("/thread", threadRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);

module.exports = router;
