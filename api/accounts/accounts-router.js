const router = require("express").Router();
const Account = require("./accounts-model");
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Account.getById(id);
    const { budget, name } = account;
    res.status(200).json({ budget, name });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const { name, budget } = req.body;
      const newAccount = await Account.create({
        name: name.trim(),
        budget,
      });
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, budget } = req.body;
      const updatedInfo = { name: name.trim(), budget };
      const updatedAccount = await Account.updateById(id, updatedInfo);
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAccount = await Account.deleteById(id);
    res.status(200).json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

// Error Handler
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
