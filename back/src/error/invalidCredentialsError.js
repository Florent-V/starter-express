import UnauthorizedError from "./unauthorizedError.js";

class InvalidCredentialsError extends UnauthorizedError {
  constructor(message = 'Invalid credentials') {
    super(message);
    this.name = 'InvalidCredentialsError';
}
}

export default InvalidCredentialsError;
