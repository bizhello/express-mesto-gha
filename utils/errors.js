const fncCstErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Данные не валидны' });
  } else if (err.name === 'CastError') {
    res.status(404).send({ message: 'Данные по этому id не найдены!' });
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const notFound = 404;

module.exports = {
  fncCstErrors,
  notFound,
};
