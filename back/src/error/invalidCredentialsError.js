import BadRequestError from "./badRequestError.js";

class InvalidCredentialsError extends BadRequestError {
  constructor(message = 'Invalid credentials') {
    super(message);
    this.name = 'InvalidCredentialsError';
}
}

export default InvalidCredentialsError;
