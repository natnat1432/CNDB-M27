const { ACCOUNT_STATUS } = require("../utils/enums");
module.exports = (sequelize, Sequelize) => {
  
  console.log("ACCOUNT STATUS")
  console.log(ACCOUNT_STATUS)
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
      firstname:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      lastname:{
        type:Sequelize.STRING,
        allowNull:false
      },
      status:{
        type:Sequelize.INTEGER,
        allowNull:false,
        isIn:[Object.values(ACCOUNT_STATUS)],
        defaultValue:ACCOUNT_STATUS.PENDING,
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
