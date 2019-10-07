'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Topics',
      'description',
      {
        type: Sequelize.TEXT,
        defaultValue: "No Description"
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Topics',
      'description'
    )
  }
};
