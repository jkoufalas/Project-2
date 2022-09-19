const router = require("express").Router();
const { Thread, Post } = require("../../models");
const withAuth = require("../../utils/auth");

//post to /api/post
//user must be looged in
router.post("/", withAuth, async (req, res) => {
  try {
    //find the thread for this post
    const threadData = await Thread.findByPk(req.body.thread_id);

    var thread = threadData.get({ plain: true });

    //test to see if the thread is not suspended
    if (thread.is_active) {
      //if thread still active post to it
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
      //otherwise report that thread is suspended
    } else {
      const note = {
        title: "Error",
        test: "Thead is Suspended and cannot be posted to.",
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

module.exports = router;
