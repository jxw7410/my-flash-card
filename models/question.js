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