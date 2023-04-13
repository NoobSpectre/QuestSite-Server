export default class ErrorHandler extends Error {
  constructor(message, statusCode, success) {
    super(message);
    this.success = success;
    this.statusCode = statusCode;
  }
}
