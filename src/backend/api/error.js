class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "VALIDATION_ERROR";
    this.message = message;
  }
}

module.exports = {
  ValidationError,
};
