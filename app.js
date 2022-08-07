import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '62ea7aaca9ea08a3cfe945ed',
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
