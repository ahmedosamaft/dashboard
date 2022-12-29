const AppError = require('../utils/appError');
const handleError = (err) => {
  return new AppError(`Invaild ${err.path}: ${err.value}`, 404);
};
const handleDuplicate = (err) => {
  const [, value] = Object.entries(err.keyValue)[0];
  return new AppError(`${value} is Already used`, 400);
};
const handleValidation = (err) => {
  let errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(', ');
  return new AppError(`${errors}`, 400);
};
const handleJWTError = (err) =>
  new AppError(`Invalid Token. Please Log in again.`, 401);

const handleJWTExpiredError = (err) =>
  new AppError(`Your Token has Expired! Please Log in again.`, 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'uncaght Error';
  let error = { ...err };
  if (err.name == 'CastError') error = handleError(error);
  if (err.code == 11000) error = handleDuplicate(error);
  if (err.name == 'ValidationError') error = handleValidation(error);
  if (err.name == 'JsonWebTokenError') error = handleJWTError(error);
  if (err.name == 'TokenExpiredError') error = handleJWTExpiredError(error);
  if (!error.message) error.message = err.message;
  res
    .status(error.statusCode)
    .send({ status: error.status, message: error.message });
};
