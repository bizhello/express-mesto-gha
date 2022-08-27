const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { routes } = require('./src/routes/index');
const { errorHandler } = require('./utils/errors/errorHandler');

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.disable('x-powered-by');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6305e434a891e7ce857e0b54',
  };

  next();
});
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('connected to db');
  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
