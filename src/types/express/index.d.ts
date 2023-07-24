export {};

declare global {
  namespace express {
    export interface Request {
      user: any;
    }
  }
}
