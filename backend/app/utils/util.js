require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");



//*
//* Pagination helper functions
//*

function getPagination(page, size) {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
}

//*
//* Fetches paging data
//*

function getPagingData(fetchedData, page, limit) {
  const { count: totalItems, rows: data } = fetchedData;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, data, totalPages, currentPage };
}

//*
//* Used for hashing passwords for security of user's passwords
//*

async function hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, Number(process.env.HASH_SALT));
      return hash;
    } catch (err) {
      console.error("Error hashing password", err);
    }
  }

//*
//* Used for filtering objects with only needed fields
//*

  function filterRequestBody(inputData, allowedFields) {
    return Object.keys(inputData)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = inputData[key];
        return obj;
      }, {});
  }


  async function emptyUploadDirectory(){
    const directory = process.env.UPLOAD_PATH
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }

module.exports = {
    hashPassword,
    filterRequestBody,
    emptyUploadDirectory,
    getPagination,
    getPagingData
}