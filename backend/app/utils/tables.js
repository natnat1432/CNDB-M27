const db = require("../models");
const sequelize = db.sequelize;
const { removeSpacesAndTitleCase } = require("../utils/util");
const { DataTypes } = require("sequelize");

async function createTable(tableName) {
  const name = removeSpacesAndTitleCase(tableName);

  const queryInterface = sequelize.getQueryInterface();

  try {
    await queryInterface.createTable(name, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
    });
    return true;
  } catch (error) {
    console.error("Error creating dynamic table:", error);
    return false;
  }
}

const getAllTables = async () => {
  const queryInterface = sequelize.getQueryInterface();
  try {
    const tables = await queryInterface.sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public'",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let filteredTables = tables.filter((table) => {
      return table != "Accounts";
    });

    return filteredTables;
  } catch (error) {
    console.log("Error listing table names", error);
  }
};

async function checkIfTableExists(tableName) {
  const queryInterface = sequelize.getQueryInterface();
  try {
    // Execute a raw SQL query to check if the table exists
    const result = await queryInterface.sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name=:tableName",
      {
        replacements: { tableName },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking table existence:", error);
  }
}

async function deleteTable(tableName) {
  console.log(`Deleting table ${tableName}`);
  const queryInterface = sequelize.getQueryInterface();
  try {
    //Drop table
    await queryInterface.dropTable(tableName);
    console.log(`Table ${tableName} deleted successfully`);
    return true;
  } catch (error) {
    console.log(`Error deleting table ${tableName}`, error);
    return false;
  }
}

async function bulkInsertData(tableName, data) {
  const queryInterface = sequelize.getQueryInterface();
  try {
    await queryInterface.bulkInsert(tableName, data.map(item => ({
      data: JSON.stringify(item.data),
      createdBy: item.createdBy,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  } catch (error) {
    console.error("Error performing bulk insert:", error);
  }
}

module.exports = {
  getAllTables,
  checkIfTableExists,
  createTable,
  deleteTable,
  bulkInsertData,
};
