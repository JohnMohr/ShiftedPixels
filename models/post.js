module.exports = function (sequelize, DataTypes) {
	var Post = sequelize.define('Post', {
		// img_url: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// 	validate: {
		// 		isUrl: true
		// 	}
		// }
			img_url: DataTypes.STRING
	});

	Post.associate = function (models) {
		// add associations here
		Post.belongsTo(models.User);
		
	};

	return Post;
};