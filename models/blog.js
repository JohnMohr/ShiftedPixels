module.exports = function (sequelize, DataTypes) {
	var Blog = sequelize.define('Blog', {
			text: DataTypes.STRING
	});

	Blog.associate = function (models) {
		// add associations here
		Blog.belongsTo(models.User);
		
	};

	return Blog;
};