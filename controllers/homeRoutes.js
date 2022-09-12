const router = require("express").Router();
const {
  Category,
  Thread,
  Post,
  User,
  Group,
  GroupMembership,
  Message,
} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const threadData = await Thread.findAll({
      include: [
        {
          model: Post,
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: User,
        },
        {
          model: Category,
        },
      ],
    });

    const threads = threadData.map((thread) => thread.get({ plain: true }));

    const groupData = await Group.findAll({
      include: [
        {
          model: Message,
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: User,
          through: GroupMembership,
          as: "group_members",
        },
      ],
    });

    // Serialize data so the template can read it
    const groups = groupData.map((group) => group.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      //threads,
      logged_in: req.session.logged_in,
      //groups,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const categoryData = await Category.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

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

router.get("/new-category", async (req, res) => {
  try {
    res.render("new-category", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/threads/:id", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const threadData = await Thread.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Category,
          where: { id: req.params.id },
        },
      ],
    });

    const threads = threadData.map((thread) => thread.get({ plain: true }));

    res.render("threads", {
      threads,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/thread/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          include: [
            {
              model: User,
            },
          ],
        },
        {
          model: User,
        },
        {
          model: Category,
        },
      ],
    });

    const thread = threadData.get({ plain: true });

    console.log(thread);

    res.render("thread", {
      thread,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
