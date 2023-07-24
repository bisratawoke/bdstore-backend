import jwt from "jsonwebtoken";
import express from "express";
import IRequestWithUserObject from "../interface/express/common.interface.express.request_with_user_object";
class JwtMiddleware {
  secret: string;
  constructor() {
    this.secret = process.env.SECRET || "jwt-secret";
  }

  generateToken(req: IRequestWithUserObject, res: express.Response) {
    jwt.sign(req.user, this.secret, (err: any, token: any) => {
      if (err) {
        return res.sendStatus(500);
      } else {
        return res.status(200).json({ token: token });
      }
    });
  }

  verifyToken(
    req: IRequestWithUserObject,
    res: express.Response,
    next: express.NextFunction
  ) {
    let token: any = req.headers["authorization"];
    token = token.split(" ")[1];
    jwt.verify(token, this.secret, (err: any, result: any) => {
      if (err) {
        return res.sendStatus(401);
      } else {
        req.user = result;
        next();
      }
    });
  }
}

export default new JwtMiddleware();
