const sequelize = require("../config/connection");
const {
  Post,
  Category,
  Thread,
  Group,
  GroupMembership,
  Message,
  User,
} = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const threadData = require("./threadData.json");
const categoryData = require("./categoryData.json");

const groupData = require("./groupData.json");
const groupMembershipData = require("./groupMembershipData.json");
const messageData = require("./messageData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(categoryData, {
    returning: true,
  });

  const threads = await Thread.bulkCreate(threadData, {
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  const groups = await Group.bulkCreate(groupData, {
    returning: true,
  });

  const groupMemberships = await GroupMembership.bulkCreate(
    groupMembershipData,
    {
      returning: true,
    }
  );

  const messages = await Message.bulkCreate(messageData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
