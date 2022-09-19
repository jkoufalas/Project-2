//import modular rout
const router = require("express").Router();
//import modals
const { Category, Thread, Post, User, Subscription } = require("../models");

const getSubscribedThreads = async (id) => {
  //setup subscribed threads list for partial
  const subscriptionData = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Thread,
        through: Subscription,
        as: "users_subscribed_threads",
      },
    ],
  });

  return subscriptionData.get({ plain: true });
};

//search in root route
router.get("/", async (req, res) => {
  try {
    //get 10 posts to put on home screen
    //these posts ordered to become the most recent posts
    const postData = await Post.findAll({
      include: [
        {
          model: Thread,
          include: [
            {
              model: Category,
            },
          ],
        },
        { model: User },
      ],
      order: [["date_created", "DESC"]],
      limit: 10,
    });
    var posts = postData.map((post) => post.get({ plain: true }));
    if (req.session.logged_in) {
      //get subscription data for partial
      var subs = await getSubscribedThreads(req.session.user_id);
    } else {
      var subs = null;
    }

    // Pass serialized data and session flag into template
    res.render("homepage", {
      logged_in: req.session.logged_in,
      subs,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when the categories page is requested
router.get("/categories", async (req, res) => {
  try {
    // Get all categories and JOIN with user data
    const categoryData = await Category.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    //strip data so that only results remain
    const categories = categoryData.map((categorie) =>
      categorie.get({ plain: true })
    );

    //setup subscribed threads list for partial
    if (req.session.logged_in) {
      //get subscription data for partial
      var subs = await getSubscribedThreads(req.session.user_id);
    } else {
      var subs = null;
    }

    // Pass serialized data and session flag into template
    res.render("categories", {
      categories,
      subs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when the new category page is requested
router.get("/new-category", async (req, res) => {
  try {
    //setup subscribed threads list for partial
    if (req.session.logged_in) {
      //get subscription data for partial
      var subs = await getSubscribedThreads(req.session.user_id);
    } else {
      var subs = null;
    }

    // Pass serialized data and session flag into template
    res.render("new-category", {
      logged_in: req.session.logged_in,
      subs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when an individual thread page is requested
router.get("/threads/:id", async (req, res) => {
  try {
    // Get all threads and JOIN with user and category data
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

    const categoryData = await Category.findByPk(req.params.id, {});

    // Serialize data so the template can read it
    var cat = categoryData.get({ plain: true });

    const threads = threadData.map((thread) => thread.get({ plain: true }));

    //setup subscribed threads list for partial
    if (req.session.logged_in) {
      //get subscription data for partial
      var subs = await getSubscribedThreads(req.session.user_id);
    } else {
      var subs = null;
    }
    // Pass serialized data and session flag into template
    res.render("threads", {
      threads,
      subs,
      logged_in: req.session.logged_in,
      cat,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/thread/:id", async (req, res) => {
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
              attributes: { exclude: ["password"] },
            },
          ],
        },
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Category,
        },
      ],
    });

    const thread = threadData.get({ plain: true });

    //setup subscribed threads list for partial
    if (req.session.logged_in) {
      //get subscription data for partial
      var subs = await getSubscribedThreads(req.session.user_id);

      var subscribed;
      var isCreator;
      //variables for subscription and freezing post

      //determining if anyone is subscribed to the thread
      var count = await Subscription.count({
        where: {
          thread_id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      //turning the count into a boolean for use in handlebars
      if (count) {
        subscribed = true;
      } else {
        subscribed = false;
      }

      //determining if the current user in the creator of the thread for the suspension ability for use in handlebars
      var countCreator = await Thread.count({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      //changes the count to boolean for use in handlebars if
      if (countCreator) {
        isCreator = true;
      } else {
        isCreator = false;
      }
    } else {
      var subs = null;

      var subscribed = false;
      var isCreator = false;
    }

    // Pass serialized data and session flag into template
    res.render("thread", {
      thread,
      subs,
      logged_in: req.session.logged_in,
      subscribed,
      isCreator,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage

  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  var subs = null;
  // Pass serialized data and session flag into template
  res.render("login", {
    subs,
  });
});

module.exports = router;
