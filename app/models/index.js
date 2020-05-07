const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model to DB Tables
db.blog = require('./blog.model.js')(sequelize, Sequelize);
db.images = require('./image.model.js')(sequelize, Sequelize);
db.comments = require('./comment.model.js')(sequelize, Sequelize);
db.category = require('./category.model.js')(sequelize, Sequelize);
db.tag = require('./tag.model.js')(sequelize, Sequelize);

// Relationship
// Category => Blog Post
db.category.hasMany(db.blog, { as: "blog" })
db.blog.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "category",
});

// Blog Post => Comments
db.blog.hasMany(db.comments, { as: "comment" });
db.comments.belongsTo(db.blog, {
  foreignKey: "blogId",
  as: "blog",
});

// Tag => Blog Post
db.blog.belongsToMany(db.tag, {
  through: "post_tag",
  as: "tag",
  foreignKey: "blogId",
});

db.tag.belongsToMany(db.blog, {
  through: "post_tag",
  as: "blog",
  foreignKey: "tagId",
});





module.exports = db;