module.exports = (sequelize,Sequelize) => {
    const { LOG_TYPE, LOG_CATEGORY } = require("../utils/enums");
    const Accounts = require("./Accounts")(sequelize, Sequelize);
    const Logs = sequelize.define("Logs", {
        accountID:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:"Accounts",
                key:"id",
            }
        },
        
    })
}