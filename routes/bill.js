const express = require('express');
const multer = require('multer');
const billController = require('../controllers/bill');
const { uploadDirectory } = require('../config/uploads');

const router = express.Router();
const upload = multer({ dest: uploadDirectory });

router.get('/', billController.list);
router.get('/:id', billController.get);
router.post('/', (req, res, next) => {
  if (!req.user) return res.status(401).send({ message: 'user must be authenticated' });
  return next();
}, upload.single('file'), billController.create);
router.patch('/:id', billController.update);
router.delete('/:id', billController.remove);

module.exports = router;
