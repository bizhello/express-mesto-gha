const { isAuthorized } = require('../../utils/jwt');
const { fncCstErrors } = require('../../utils/errors');

module.exports = async (req, res, next) => {
  try {
    const isAuth = await isAuthorized(req.cookies.jwt);
    if (isAuth) {
      req.user = {
        _id: isAuth,
      };
      next();
    } else {
      res.send({ message: 'Необходима регистрация' });
    }
  } catch (err) {
    fncCstErrors(err);
  }
};
