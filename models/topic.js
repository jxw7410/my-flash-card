'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: { 
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true
    }
  });

  Topic.associate = function(models) {
    // associations can be defined here
    // Because of the relationship, 
    // Topic defaults look for a UserId, due to how User is name
    // So aliasing is needed to set it as userId
    Topic.belongsTo(models.User, {
      as: "User",
      foreignKey: "userId"
    });
  };


  return Topic;
};