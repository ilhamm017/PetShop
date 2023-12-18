'use strict';
const {hash} = require('../Helpers/Hash')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timeNow = new Date();
    await queryInterface.bulkInsert('Users', [
      {
       email : "admin@gmail.com",
       full_name : "aswarr",
       password : hash("12345678"),
       gender : "male",
       role : "admin",
       balance : 100000,
       createdAt: timeNow,
       updatedAt: timeNow
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
