const RequestError = function(status, message) {
  this.status  = status;
  this.message = message || null;
};

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

export default RequestError;
