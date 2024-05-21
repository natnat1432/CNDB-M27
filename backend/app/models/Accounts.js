module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define(
    "Accounts",
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      paranoid: true,
    }
  );
  return Accounts;
};
