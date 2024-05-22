class ApiError extends Error {
  constructor(status, message) {
    //call parent constructor with super()
    super();
    this.status = status;
    this.message = message;
  }
  //create static (without creation object) function
  static badRequest(message) {
    return new ApiError(404, message);
  }
  static internal(message) {
    return new ApiError(500, message);
  }
  static forbidden(message) {
    return new ApiError(403, message);
  }
}
module.exports = ApiError;
