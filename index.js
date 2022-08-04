require("dotenv").config();

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const { PORT = 3000 } = process.env;
const {routes} = require('./src/routes/index');

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('connected to db');
  app.listen(PORT);
  console.log(`Server listen on ${PORT}`)
}

main();

// const PATH = __dirname;
// const path = require('path');
// const PUBLIC_FOLDER = path.join(PATH, 'public');
// app.use((req, res, next) => {
//   console.log(`${req.method} : ${req.path} : ${JSON.stringify(req.headers)}`);
//   next()
// })
// app.use(express.static(PUBLIC_FOLDER));
// app.get("/", (req, res) => {
//   res.send(`PATH: ${PATH}`)
// });
// app.post("/", express.json(), (req, res) => {
//   res.send(req.body);
// });
// app.use((req, res, next) => {
//   req.user = {
//     _id: '62ea7c0fc2678588d91ae7ca',
//   };
//   next();
// });
// module.exports.createCard = (req, res) => {
//   console.log(req.user);
// };
// module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//   { new: true },
// )
// module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $pull: { likes: req.user._id } }, // убрать _id из массива
//   { new: true },
// )