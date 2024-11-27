class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
