const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
};

const handleErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "something went wrong!",
  });
};

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
  handleErrors,
};
