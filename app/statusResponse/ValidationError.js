class ValidationError extends Error {
  constructor(message, status, data) {
    super(message); // (1)
    // this.name = "ValidationError"; // (2)
    this.status = status;
    this.data = data ? data : '';
  }
}
module.exports = ValidationError;
