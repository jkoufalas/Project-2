const router = require("express").Router();
const emailConnection = require("../../config/email_connection");
const { Thread, User, Category, Subscription } = require("../../models");
const withAuth = require("../../utils/auth");

//creating new thread with post to /api/threads
//user must be logged in
router.post("/", withAuth, async (req, res) => {
  try {
    const newThread = await Thread.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log(newThread);

    res.status(200).json(newThread);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//resuming thread by posting to /api/threads/activate/id
//user must be logged in
router.post("/activate/:id", withAuth, async (req, res) => {
  try {
    //updating isActive to true to resume thread
    const activateThread = await Thread.update(
      {
        is_active: true,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
          //query where user id is the creator
        },
      }
    );

    res.status(200).json(activateThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

//suspending thread by posting to /api/threads/activate/id
//user must be logged in
router.post("/deactivate/:id", withAuth, async (req, res) => {
  try {
    //getting list of users subscribed to thread
    const usersSubscribed = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: User,
          through: Subscription,
          as: "threads_subscription",
        },
        {
          model: User,
        },
      ],
    });

    //stripping to only required data
    var thread = usersSubscribed.get({ plain: true });

    //updating isActive to false to suspend thread
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

    //iterate through all subscribed users
    thread.threads_subscription.map((user) => {
      let message = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Thread #${thread.id} ${thread.thread_name} has been Suspended`,
        text: `This thread has been suspended by its Creator ${thread.user.name}`,
      };

      //send email notification to each user
      emailConnection.sendMail(message, function (error, info) {
        if (error) {
          console.log(
            `Error Occured sending Email for suspension of thread #${thread.id} to ${user.email}`
          );
        } else {
          console.log(
            `Email of Suspension thread #${thread.id} to ${user.email} sent successfully`
          );
        }
      });
    });

    res.status(200).json(deactivateThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
