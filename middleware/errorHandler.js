const AppError = require('../errors/AppError');

function handleMongooseValidationError(error) {
  return new AppError('Validation failed.', 400);
}

function handleMongooseCastError(error) {
  return new AppError(`Invalid value for ${error.path}.`, 400);
}

function handleMongoDuplicateKeyError(error) {
  const duplicateField = Object.keys(error.keyValue)[0];
  return new AppError(`${duplicateField} already exists.`, 409);
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let normalizedError = error;

  if (error.name === 'ValidationError') {
    normalizedError = handleMongooseValidationError(error);
  } else if (error.name === 'CastError') {
    normalizedError = handleMongooseCastError(error);
  } else if (error.code === 11000) {
    normalizedError = handleMongoDuplicateKeyError(error);
  } else if (!(error instanceof AppError)) {
    normalizedError = new AppError('Something went wrong.', 500);
  }

  const response = {
    status: normalizedError.status,
    message: normalizedError.message
  };

  if (error.name === 'ValidationError') {
    response.errors = Object.values(error.errors).map((validationError) => ({
      field: validationError.path,
      message: validationError.message
    }));
  }

  if (process.env.NODE_ENV !== 'production') {
    response.stack = error.stack;
  }

  return res.status(normalizedError.statusCode).json(response);
}

module.exports = errorHandler;
