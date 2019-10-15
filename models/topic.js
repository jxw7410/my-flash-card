'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name: Topic name cannot be empty."
        }
      }
    },
    type: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Type: Topic Type cannot be empty."
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 160],
          msg: "Description: There is a max of 160 characters."
        }
      }
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


  // Class Methods

  Topic.prototype.parsedData = function(){
    return {
      [this.id] : {
        name: this.name,
        type: this.type,
        description: this.description
      }
    }
  }

  return Topic;
};