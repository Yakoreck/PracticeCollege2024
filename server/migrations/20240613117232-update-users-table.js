module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("products", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Якщо необхідно відкатити міграцію, ви можете змінити тип стовпця назад на STRING
    await queryInterface.changeColumn("products", "description", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
