module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        meta: {
            type: DataTypes.STRING
        }
    });

    return Category;
}