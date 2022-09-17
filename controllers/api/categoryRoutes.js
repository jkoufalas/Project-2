const router = require("express").Router();
const { Category } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newCategory = await Category.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.redirect("/categories");
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
