'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      xid: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      status :{
        type: Sequelize.STRING
      },
      active:{
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    const value = [
      {
      "xid": "bf259c3f8dc204775304",
      "username": "admin",
      "password": "$2a$10$pgEhirD41LC2iQA4fLL.uOaWHAw42bRnrOHViMnkD3IFQOEsPV9SC",
      "active": true,
      "status": "guru",
      "updated_at": "2023-04-24T05:13:53.459Z",
      "created_at": "2023-04-24T05:13:53.459Z"
    }];

    await queryInterface.bulkInsert("users", value);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};