const Account = require("./accounts-model");

const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    next({
      status: 400,
      message: "name and budget are required",
    });
  } else if (typeof budget !== "number") {
    next({
      status: 400,
      message: "budget of account must be a number",
    });
  } else if (typeof name !== "string") {
    next({
      status: 400,
      message: "name of account must be a string",
    });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({
      status: 400,
      message: "name of account must be between 3 and 100",
    });
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    next();
  }
};

const checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim();
  const account = await Account.getByName(name);
  if (account) {
    next({
      status: 400,
      message: "that name is taken",
    });
  } else {
    next();
  }
};

const checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  const targetAccount = await Account.getById(id);
  if (!targetAccount) {
    next({
      status: 404,
      message: "account not found",
    });
  } else {
    next();
  }
};

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
};
