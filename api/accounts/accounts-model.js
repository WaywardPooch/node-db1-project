const db = require("./../../data/db-config");

const getAll = async () => {
  const accounts = await db("accounts");
  return accounts;
};

const getById = async (id) => {
  const account = await db("accounts").where({ id }).first();
  return account;
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  const newAccount = await getById(id);
  return newAccount;
};

const updateById = async (id, account) => {
  await db("accounts").update(account).where({ id });
  return await getById(id);
};

const deleteById = async (id) => {
  const deletedAccount = await getById(id);
  await db("accounts").del().where({ id });
  return deletedAccount;
};

const getByName = async (name) => {
  const account = await db("accounts").where({ name });
  return account;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};
