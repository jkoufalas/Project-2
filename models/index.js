const User = require("./User");
const Category = require("./Category");
const Thread = require("./Thread");
const Post = require("./Post");

const Group = require("./Group");
const GroupMembership = require("./GroupMembership");
const Message = require("./Message");
const Subscription = require("./Subscription");

/*------------------------------------------------------------
// This portion Implements the Threads portion of the database
------------------------------------------------------------*/
Category.hasMany(Thread, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Thread.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

User.hasMany(Category, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Category.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Thread, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Thread.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Thread.hasMany(Post, {
  foreignKey: "thread_id",
  onDelete: "CASCADE",
});

Post.belongsTo(Thread, {
  foreignKey: "thread_id",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Thread.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Subscription,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "threads_subscription",
});

User.belongsToMany(Thread, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Subscription,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "users_subscribed_threads",
});

/*------------------------------------------------------------
// This portion Implements the Groups portion of the database
------------------------------------------------------------*/

Group.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: GroupMembership,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "group_members",
});

User.belongsToMany(Group, {
  // Define the third table needed to store the foreign keys
  through: {
    model: GroupMembership,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "users_groups",
});

Group.hasMany(Message, {
  foreignKey: "group_id",
  onDelete: "CASCADE",
});

Message.belongsTo(Group, {
  foreignKey: "group_id",
  onDelete: "CASCADE",
});

User.hasMany(Message, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Message.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Category,
  Thread,
  Post,
  Group,
  Message,
  GroupMembership,
  Subscription,
};
