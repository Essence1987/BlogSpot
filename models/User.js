const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');
const { time } = require('console');

class User extends Model {
    // Set up method to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (newUser) => {
          newUser.password = await bcrypt.hash(newUser.password, 10);
          return newUser;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;