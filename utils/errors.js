// eslint-disable-next-line max-classes-per-file
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  errorHandler,
  BadRequestError,
  ValidationError,
  Unauthorized,
  NotFoundError,
  Conflict,
  Forbidden,
};
