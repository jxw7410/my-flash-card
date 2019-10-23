'use strict';

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Question: Question cannot be empty."
        },
        len: {
          args: [1, 315],
          msg: 'Question: There is a max of 315 characters'
        }
      }
    },
    
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Answer: Answer cannot be empty.'
        },
        len: {
          args: [1, 315],
          msg: 'Question: There is a max of 315 characters'
        }
      }
    }
  });

  Question.associate = function(models) {
    Question.belongsTo(models.Topic, {
      as: 'Topic',
      foreignKey: "topicId"
    })
  };


  Question.prototype.parseData = function(){
    return {
      [this.id]: {
        questionId: this.id,
        question: this.question,
        answer: this.answer
      }
    }
  }

  return Question;
}