

module.exports = (sequelize,Sequelize) => {
    const Accounts = require("./Accounts.js")(sequelize, Sequelize);

    const Records = sequelize.define(
        "Records",
        {
            data:{
                type:Sequelize.JSON,
                allowNull:false,
            },
            createdBy: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: "Accounts",
                  key: "id",
                },
              },
        }
    )

    Records.belongsTo(Accounts, {
        foreignKey: "createdBy",
      });
    return Records;
}