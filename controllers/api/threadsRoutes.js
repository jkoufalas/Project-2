const router = require("express").Router();
const { Thread, User, Category, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const threadData = await Thread.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
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

router.post("/", withAuth, async (req, res) => {
  try {
    const newThread = await Thread.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/activate/:id", withAuth, async (req, res) => {
  try {
    console.log("---------------1-------------------------------------");

    const activateThread = await Thread.update(
      {
        is_active: true,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    res.status(200).json(activateThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/deactivate/:id", withAuth, async (req, res) => {
  try {
    console.log("----------------------------------------------------");
    const deactivateThread = await Thread.update(
      {
        is_active: false,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    res.status(200).json(deactivateThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
