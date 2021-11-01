const router = require("express").Router();
const Account = require("./accounts-model");
const {
  checkAccountId,
  handleErrors,
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
      const newAccount = await Account.create({ name, budget });
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id", async (req, res, next) => {});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

router.use(handleErrors);

module.exports = router;
