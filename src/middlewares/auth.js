const { isAuthorized } = require('../../utils/jwt');
const { Unauthorized } = require('../../utils/errors');

module.exports = async (req, res, next) => {
  try {
    const isAuth = await isAuthorized(req.cookies.jwt);
    if (isAuth) {
      req.user = {
        _id: isAuth,
      };
      next();
    } else {
      throw new Unauthorized('Необходима регистрация');
    }
  } catch (error) {
    next(error);
  }
};
