class GeneralError extends Error {
  
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      console.info(`Returning BadRequest, message: ${this.message}`)
      return 400;
    } if (this instanceof NotFound) {
      console.info(`Returning NotFound, message: ${this.message}`)
      return 404;
    }

    console.error(`Returning InternalServerError, message: ${this.message}`)
    return 500;
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  NotFound
};
