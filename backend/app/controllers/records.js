const db = require("../models");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const Records = db.Records;
const {
  BadRequestError,
  NotFoundError,
  DuplicateError,
} = require("../errors/customErrors");
const { parse } = require("fast-csv");
const { createReadStream } = require("fs");
const { StatusCodes } = require("http-status-codes");
const { filterRequestBody, emptyUploadDirectory } = require("../utils/util");
const {
  getAllTables,
  checkIfTableExists,
  createTable,
  deleteTable,
  bulkInsertData,
} = require("../utils/tables");
require("dotenv").config();

const { getPagination, getPagingData } = require("../utils/util");

const BATCH_SIZE = 1000; // Define a batch size for the bulk inserts

exports.create = async (req, res) => {
  try {
    if (req.file == undefined) {
      throw new BadRequestError("Please upload csv file only");
    }
    const acceptedFields = req.body.acceptedFields.split(",");
    const createdBy = req.body.createdBy;
    const table = req.body.table;

    console.log("table name", table);
    let records = [];
    let path = process.env.UPLOAD_PATH + req.file.filename;

    createReadStream(path)
      .pipe(parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        records.push({
          data: filterRequestBody(row, acceptedFields),
          createdBy: Number(createdBy),
        });
      })
      .on("end", async () => {
        // upload of data to db here
        const queryInterface = sequelize.getQueryInterface();
        try {
          for (let i = 0; i < records.length; i += BATCH_SIZE) {
            const batch = records.slice(i, i + BATCH_SIZE);
            await bulkInsertData(table, batch);
          }
          await emptyUploadDirectory();
          return res
            .status(StatusCodes.OK)
            .send({ message: "Upload successful" });
        } catch (error) {
          console.error(error);
          throw new BadRequestError("Error uploading records");
        }
      });
  } catch (error) {
    console.error(error);
    throw new BadRequestError("Error uploading records");
  }
};

// exports.findAll = async (req, res) => {
//   let { page, size, query, order } = req.query;

//   if (!order) {
//     order = "newest";
//   }
//   const searchCondition = query
//     ? // Use LOWER() to convert both data::text and query to lowercase for case-insensitive matching
//       db.sequelize.where(
//         db.sequelize.fn("LOWER", db.sequelize.literal("data::text")),
//         {
//           [Op.like]: `%${query.toLowerCase()}%`,
//         }
//       )
//     : null;

//   const { limit, offset } = getPagination(page, size);
//   Records.findAndCountAll({
//     where: searchCondition,
//     limit: limit,
//     offset: offset,
//     order: [["createdAt", order == "oldest" ? "ASC" : "DESC"]],
//   }).then((data) => {
//     const response = getPagingData(data, page, limit);
//     return res.status(StatusCodes.OK).send(response);
//   });
// };

exports.findAll = async (req, res, next) => {
  let { page, size, query, order, table } = req.query;

  if (!table) {
    return next(new BadRequestError('Missing table name'));
  }

  if (!order) {
    order = 'newest';
  }

  const isTableExists = await checkIfTableExists(table);
  if (!isTableExists) {
    return next(new BadRequestError('Table does not exist'));
  }

  try {
    const searchCondition = query
      ? `WHERE data::text LIKE :searchQuery`
      : '';

    const { limit, offset } = getPagination(page, size);

    const finalQuery = `SELECT * FROM "${table}" ${searchCondition}
      ORDER BY "createdAt" ${order === 'oldest' ? 'ASC' : 'DESC'}
      LIMIT :limit OFFSET :offset`;

    const countQuery = `SELECT COUNT(*) AS total FROM "${table}" ${searchCondition}`;

    const replacements = {
      searchQuery: query ? `%${query.toLowerCase()}%` : null,
      limit,
      offset,
    };

    const [results, totalCount] = await Promise.all([
      sequelize.query(finalQuery, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(countQuery, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      }),
    ]);

    const totalItems = totalCount[0].total;
    const response = getPagingData({ count: totalItems, rows: results }, page, limit);
    return res.status(StatusCodes.OK).send(response);
  } catch (error) {
    console.error('Error executing query:', error);
    next(error);
  }
};
exports.countAll = async (req, res) => {
  const count = await getAllTables();
  return res.status(StatusCodes.OK).send({ totalRecords: count.length });
};

exports.listAllTable = async (req, res, next) => {
  console.log("Listing all tables");
  const queryInterface = sequelize.getQueryInterface();
  try {
    const tables = await getAllTables();
    const finalTables = [];
    await Promise.all(
      tables.map(async (table) => {
        const count = await queryInterface.sequelize.query(
          `SELECT COUNT(*) as totalRows FROM public."${table}"`,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        );
        finalTables.push({
          name: table[0],
          count: count[0].totalrows,
        });
      })
    );
    return res.status(StatusCodes.OK).send(finalTables);
  } catch (error) {
    console.log("Error listing table names");
    next(error);
  }
};

exports.addTable = async (req, res, next) => {
  const name = req.body.name;
  const creatorID = req.body.creatorID;

  try {
    const isTableExists = await checkIfTableExists(name);
    if (isTableExists) {
      throw new BadRequestError(`${name} already exists`);
    }

    const isTableCreated = await createTable(name);
    if (isTableCreated) {
      return res
        .status(StatusCodes.OK)
        .send({ message: "Table created successfully" });
    } else {
      throw new BadRequestError("Error creating table");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteTableRecord = async (req, res, next) => {
  const name = req.params.name;
  if (!name) {
    throw new BadRequestError("Missing table name");
  }
  try {
    const isTableExists = await checkIfTableExists(name);
    if (!isTableExists) {
      throw new BadRequestError(`${name} does not exists`);
    }

    const isTableDeleted = await deleteTable(name);
    if (isTableDeleted) {
      return res
        .status(StatusCodes.OK)
        .send({ message: "Table deleted successfully" });
    } else {
      throw new BadRequestError("Error creating table");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
