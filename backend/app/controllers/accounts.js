const db = require("../models");
const Op = db.Sequelize.Op;
const Accounts = db.Accounts;
const { BadRequestError, NotFoundError } = require("../errors/customErrors");
const { StatusCodes } = require("http-status-codes");
const { ACCOUNT_STATUS } = require("../utils/enums");
const {
  filterRequestBody,
  getPagination,
  getPagingData,
} = require("../utils/util");
require("dotenv").config();

exports.findAll = async (req, res) => {
  let { page, size, query, order, status } = req.query;
  if (!order) {
    order = "newest";
  }

  const { limit, offset } = getPagination(page, size);
  const searchCondition = query
    ? {
        [Op.or]: [
          { username: { [Op.substring]: query } },
          { firstname: { [Op.substring]: query } },
          { lastname: { [Op.substring]: query } },
        ],
      }
    : null;
  const statusCondition =
    status !== "All"
      ? {
          status: ACCOUNT_STATUS[status.toUpperCase()],
        }
      : null;

    const condition = {
        [Op.and]:[
            searchCondition,
            statusCondition,
        ]
    }

  Accounts.findAndCountAll({
    where: condition,
    limit: limit,
    offset: offset,
    order: [["createdAt", order == "oldest" ? "ASC" : "DESC"]],
  }).then((data) => {
    const response = getPagingData(data, page, limit);
    return res.status(StatusCodes.OK).send(response);
  });
};
