const { hashPassword } = require("../utils/util");

require("dotenv").config();

async function createSuperAdmin(Accounts) {
  console.log("\n\n");
  console.log("Checking main Superadmin account...");
  const username = process.env.SUPERADMIN_DEFAULT_USERNAME;
  const password = process.env.SUPERADMIN_DEFAULT_PASS;

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
