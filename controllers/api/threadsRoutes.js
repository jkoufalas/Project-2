const router = require("express").Router();
const emailConnection = require("../../config/email_connection");
const { Thread, User, Category, Post, Subscription } = require("../../models");
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
    console.log("-11212--1212--------------------------");
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

router.post("/activate/:id", withAuth, async (req, res) => {
  try {
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

    var thread = usersSubscribed.get({ plain: true });

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

    thread.threads_subscription.map((user) => {
      let message = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Thread #${thread.id} ${thread.thread_name} has been Suspended`,
        text: `This thread has been suspended by its Creator ${thread.user.name}`,
      };

      emailConnection.sendMail(message, function (error, info) {
        if (error) {
          console.log(process.env.EMAIL_HOST);
          console.log(error);
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
