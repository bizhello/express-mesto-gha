const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { routes } = require('./src/routes/index');

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '62ea2b94b14bc4e6c5c92c35',
  };

  next();
});
app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('connected to db');
  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
