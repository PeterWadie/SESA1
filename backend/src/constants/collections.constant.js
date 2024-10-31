const codeSchema = require('../modules/v1/auth/codes/codes.schema');
const contactSchema = require('../modules/v1/contacts/contacts.schema');
const tokenSchema = require('../modules/v1/auth/tokens/tokens.schema');
const userSchema = require('../modules/v1/users/users.schema');

const collectionConstant = {
  codes: codeSchema,
  contacts: contactSchema,
  tokens: tokenSchema,
  users: userSchema,
};

module.exports = collectionConstant;
