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
    console.log(threads);

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
    console.log(groups);

    // Pass serialized data and session flag into template
    res.render("homepage", {
      threads,
      logged_in: req.session.logged_in,
      groups,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
