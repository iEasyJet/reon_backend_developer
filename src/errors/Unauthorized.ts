class Unauthorized extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}

export default Unauthorized;
