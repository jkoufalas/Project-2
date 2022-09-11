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
        },
        {
          model: Category,
          where: { id: req.params.id },
        },
      ],
    });

    const threads = threadData.map((thread) => thread.get({ plain: true }));

    console.log(threads);

    // Pass serialized data and session flag into template
    res.render("threads", {
      threads,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  "/",
  /* withAuth, */ async (req, res) => {
    try {
      const newThread = await Thread.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newThread);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.delete(
  "/:id",
  /* withAuth, */ async (req, res) => {
    try {
      const newThread = await Thread.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!newThread) {
        res.status(404).json({ message: "No thread found with this id!" });
        return;
      }

      res.status(200).json(newThread);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
