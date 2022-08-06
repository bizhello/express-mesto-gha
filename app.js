/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/index.js';

const app = express();
const PORT = 3000;

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
  app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
