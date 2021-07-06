class ValidationError extends Error {
  constructor(message, status, data) {
    super(message); 
    this.status = status;
    this.data = data ? data : '';
  }
}
module.exports = ValidationError;
