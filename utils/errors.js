const fncCstErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Данные не валидны' });
  } else if (err.name === 'CastError') {
    res.status(404).send({ message: 'Пользователь с таким id не найден' });
  } else if (err.message === 'Такой пользователь уже существует') {
    res.status(409).send({ message: 'Такой пользователь уже существует' });
  } else if (err.code === 11000) {
    res.status(409).send({ message: 'Такой пользователь уже существует' });
  } else if (err.message === 'Неправильно указан логин и/или пароль!') {
    res.status(401).send({ message: 'Неправильно указан логин и/или пароль' });
  } else if (err.code === 'ERR_HTTP_HEADERS_SENT') {
    res.status(401).send({ message: 'Необходима регистрация' });
  } else if (err.message === 'Необходима регистрация') {
    res.status(401).send({ message: 'Необходима регистрация' });
  } else {
    res.status(500).send({ message: err.message });
  }
};

const notFound = 404;
module.exports = {
  fncCstErrors,
  notFound,
};
