const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');

if (process.env.NODE_ENV === 'production' && !process.env.BILLED_JWT_SECRET) {
  throw new Error('BILLED_JWT_SECRET is required in production');
}
const secret = process.env.BILLED_JWT_SECRET || randomBytes(32);

const encrypt = (value) => jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: value,
  },
  secret,
);

const isValid = (value) => new Promise((resolve, reject) => {
  jwt.verify(value, secret, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});

module.exports = {
  encrypt,
  isValid,
};
