const router = require("express").Router();
const { Thread, Post, Subscription } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/:id", withAuth, async (req, res) => {
  try {
    console.log("----------------------------------------------------1");
    const newSubscription = await Subscription.create({
      thread_id: req.params.id,
      user_id: req.session.user_id,
    });
    console.log("----------------------------------------------------2");

    res.status(200).json(newSubscription);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    console.log("1----------------------------------------------------1");
    const deleteSubscription = await Subscription.destroy({
      where: {
        thread_id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    console.log("2----------------------------------------------------2");

    if (!deleteSubscription) {
      res.status(404).json({ message: "Cannot delete subscription!" });
      return;
    }

    res.status(200).json(deleteSubscription);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
