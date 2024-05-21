const db = require("../models");
const Op = db.Sequelize.Op;
const Records = db.Records;
const { BadRequestError, NotFoundError } = require("../errors/customErrors");
const { parse } = require("fast-csv");
const { createReadStream } = require("fs");
const { StatusCodes } = require("http-status-codes");
const { filterRequestBody, emptyUploadDirectory } = require("../utils/util");
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
        try {
          for (let i = 0; i < records.length; i += BATCH_SIZE) {
            const batch = records.slice(i, i + BATCH_SIZE);
            await Records.bulkCreate(batch, { validate: true });
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

exports.findAll = async (req, res) => {
  let { page, size, query, order } = req.query;

  if (!order) {
    order = "newest";
  }
  const searchCondition = query
    ? // Use LOWER() to convert both data::text and query to lowercase for case-insensitive matching
      db.sequelize.where(
        db.sequelize.fn("LOWER", db.sequelize.literal("data::text")),
        {
          [Op.like]: `%${query.toLowerCase()}%`,
        }
      )
    : null;

  const { limit, offset } = getPagination(page, size);
  Records.findAndCountAll({
    where: searchCondition,
    limit: limit,
    offset: offset,
    order: [["createdAt", order == "oldest" ? "ASC" : "DESC"]],
  }).then((data) => {
    const response = getPagingData(data, page, limit);
    return res.status(StatusCodes.OK).send(response);
  });
};

exports.countAll = async (req, res) => {
  const count = await Records.count();

  return res.status(StatusCodes.OK).send({ totalRecords: count });
};
