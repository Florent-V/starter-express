class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
      super(message);
      this.name = 'ForbiddenError';
      this.status = 403;
  }
}

export default ForbiddenError;
