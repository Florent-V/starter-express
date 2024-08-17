import NotFoundError from "../error/notFoundError.js";

export const errorHandler = (error, req, res, next) => {
  console.log('errorHandler()');

  const serializedError = {};
  Object.getOwnPropertyNames(error).forEach((key) => {
    serializedError[key] = error[key];
  });


  res.status(error.status || 500).send(serializedError);
}

export const notFound = (req, res, next) => {
  return next(new NotFoundError('Page Not Found'));
}

export const logError = (err, req, res, next) => {
  console.log("logError()", err);
  next(err);
}