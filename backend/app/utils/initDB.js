const { hashPassword } = require("../utils/util");
const { ACCOUNT_STATUS } = require("../utils/enums");
require("dotenv").config();

async function createSuperAdmin(Accounts) {
  console.log("\n\n");
  console.log("Checking main Superadmin account...");
  const username = process.env.SUPERADMIN_DEFAULT_USERNAME;
  const password = process.env.SUPERADMIN_DEFAULT_PASS;
  const firstname = process.env.SUPERADMIN_DEFAULT_FIRSTNAME;
  const lastname = process.env.SUPERADMIN_DEFAULT_LASTNAME;

  var hashedPassword = await hashPassword(password);

  const checkUsername = await Accounts.findOne({
    where: { username: username },
    paranoid: false,
  });

  //*
  //* Create superadmin if it doesnt exist
  //*

  if (!checkUsername) {
    console.log("Creating Main Superadmin account...");
    const createSuperAdmin = {
      username: username,
      password: hashedPassword,
      firstname: firstname,
      lastname:lastname,
      createdBy:1,
      status:ACCOUNT_STATUS.ACTIVE,

    };
    //*
    //*Save Superadmin Account in the database
    //*

    Accounts.create(createSuperAdmin)
      .then(async (data) => {
        console.log("\n");
        console.log("Superadmin account created successfully");
      })
      .catch((err) => {
        console.log("\n");
        console.log(
          "Some error occured while creating superadmin account",
          err
        );
      });
  } else {
  }
}

module.exports = {
  createSuperAdmin,
};
