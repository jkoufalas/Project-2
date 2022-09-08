const router = require("express").Router();
const { Thread, User, Category, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const categoryData = await Category.findAll({});

    const categories = categoryData.map((categorie) =>
      categorie.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("categories", {
      categories,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
