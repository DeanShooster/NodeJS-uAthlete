const errorMessages = {
  badRequest: "Bad Request, fields are missing or invalid input",
  noAuth: "No Authentication",
  serverError: "Server Error",
};

class GenericError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

const ErrorHandler = (error, req, res, next) => {
  let ErrorOb;
  if (error.constructor.name === "Error") ErrorOb = { Error: errorMessages.serverError, status: 500 };
  else if (error.message === "jwt expired" || error.message === "invalid token") ErrorOb = { Error: errorMessages.noAuth, status: 401 };
  else ErrorOb = { Error: error.message, status: error.status };
  return res.status(error.status || 500).send(ErrorOb);
};

module.exports = { errorMessages, ErrorHandler, GenericError };
