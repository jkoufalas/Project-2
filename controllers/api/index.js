const router = require("express").Router();
const threadsRoutes = require("./threadsRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const subscribeRoutes = require("./subscribeRoutes");

router.use("/threads", threadsRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.use("/subscription", subscribeRoutes);

module.exports = router;
