//import modular routes
const router = require("express").Router();

//import routes
const threadsRoutes = require("./threadsRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const subscribeRoutes = require("./subscribeRoutes");
const postRoutes = require("./postRoutes");

//implement those routes
router.use("/threads", threadsRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.use("/subscription", subscribeRoutes);
router.use("/post", postRoutes);

module.exports = router;
