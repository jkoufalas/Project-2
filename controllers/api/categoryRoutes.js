const router = require("express").Router();
const { Category } = require("../../models");
const withAuth = require("../../utils/auth");

//posting data to /api
router.post("/", withAuth, async (req, res) => {
  try {
    //create new category with json data
    //user must be loged in to post with withAuth method
    //session id used to create to avoid manipulation
    const newCategory = await Category.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.redirect("/categories");
    return;
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
