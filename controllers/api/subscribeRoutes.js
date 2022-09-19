const router = require("express").Router();
const { Subscription } = require("../../models");
const withAuth = require("../../utils/auth");

//this route is used to subscribe to a thread
//the user must be logged in to post
router.post("/:id", withAuth, async (req, res) => {
  try {
    //create subscription with thread and user data
    //user data is entered by session so no manipulation can occur
    const newSubscription = await Subscription.create({
      thread_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSubscription);
  } catch (err) {
    res.status(400).json(err);
  }
});

//this route is used to unsubscribe to a thread
//the user must be logged in to post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    //delete subscription with thread and user data
    //user data is used by session so no manipulation can occur
    const deleteSubscription = await Subscription.destroy({
      where: {
        thread_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

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
