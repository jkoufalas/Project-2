const router = require("express").Router();
const { Thread, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.body.thread_id);

    var thread = threadData.get({ plain: true });

    if (thread.is_active) {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
    } else {
      const note = {
        title: "Error",
        test: "Thead is inActive and cannot be posted to.",
      };

      const response = {
        status: "error",
        body: note,
      };
      res.status(400).json(response);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await Thread.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: "Cannot delete post!" });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
