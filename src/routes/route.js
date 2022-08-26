const { NotFoundError } = require('../../utils/errors');

async function route(req, res, next) {
  try {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  route,
};
