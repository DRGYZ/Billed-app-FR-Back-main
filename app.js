const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/auth');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const billRoute = require('./routes/bill');
const { uploadDirectory } = require('./config/uploads');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/public', express.static(uploadDirectory, {
  setHeaders: (res) => res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'),
}));
app.get('/', (req, res) => {
  res.status(200).send('Bill app backend API v1');
});
app.use(authMiddleware);
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/bills', billRoute);

module.exports = app;
