const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [30]
        // }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [15]
        // }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   len: [15]
        // }
      }
    });
  
    User.associate = function (models) {
      // add associations here
      User.hasMany(models.Post);
    };
  
    User.beforeCreate(function (user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
  
    return User;
  };