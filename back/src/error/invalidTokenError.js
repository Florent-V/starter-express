class InvalidTokenError extends Error {
  constructor(message) {
      super(message);
      this.name = 'InvalidTokenError';
      this.status = 401;
  }
}

export default InvalidTokenError;