const Account = require("./accounts-model");

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
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

const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
  handleErrors,
};
