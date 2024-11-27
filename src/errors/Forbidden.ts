class Forbidden extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
    Object.setPrototypeOf(this, Forbidden.prototype);
  }
}

export default Forbidden;
