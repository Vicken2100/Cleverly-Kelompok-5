'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizs', {
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
      judul: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tingkatkesulitan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deskripsi:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      soal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subclassname:{
        allowNull: false,
        type: Sequelize.STRING
      },
      tipe: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      nomor:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      jawaban:{
        type: Sequelize.STRING,
        allowNull: false
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quizs');
  }
};