export enum errorCode {
  UNAUTHORIZED = 403,
  UNAUTHENTICATED = 401,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}
export default class Exceptions extends Error {
  public code: errorCode;
  constructor(message: string, code: errorCode) {
    super(message);
    this.code = code;
  }
}
