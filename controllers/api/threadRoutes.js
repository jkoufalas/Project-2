const router = require("express").Router();
const { Thread, User, Category, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
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

module.exports = router;
