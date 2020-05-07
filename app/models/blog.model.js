module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        published: {
            type: DataTypes.BOOLEAN,
        }
    });

    return Blog;
}