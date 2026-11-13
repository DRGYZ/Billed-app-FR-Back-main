const { join } = require('path');

module.exports = {
  uploadDirectory: process.env.BILLED_UPLOAD_DIR || join(__dirname, '..', 'public'),
};
