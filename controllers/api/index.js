const router = require("express").Router();
const threadsRoutes = require("./threadsRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const subscribeRoutes = require("./subscribeRoutes");
const postRoutes = require("./postRoutes");

router.use("/threads", threadsRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.use("/subscription", subscribeRoutes);
router.use("/post", postRoutes);

module.exports = router;
