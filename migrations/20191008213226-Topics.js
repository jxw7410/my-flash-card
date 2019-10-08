'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return Promise.all([
      queryInterface.sequelize.query(
        'ALTER TABLE "Topics" DROP CONSTRAINT IF EXISTS Topics_name_key;'
      ),
      queryInterface.sequelize.query(
        'ALTER TABLE "Topics" DROP CONSTRAINT IF EXISTS Topics_type_key;'
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
     queryInterface.addConstraint('Topics', ['name'], {
       type: 'unique',
       name: 'Topics_name_key'
     }),
     queryInterface.addConstraint('Topics', ['type'], {
       type: 'unique',
       name: 'Topics_type_key'
     })
   ]);
  }
};
