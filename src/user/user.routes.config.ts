import CommonRoutesConfig from "../common/common.routes.config";
import express from "express";
import UserController from "./controller/user.controller";
import commonMiddlewareJwt from "../common/middlewares/common.middleware.jwt";

export default class UserRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application, baseUri: string) {
    super(app, baseUri);
    this.ConfigureRoutes();
  }

  ConfigureRoutes(): express.Application {
    this.app
      .route(`${this.baseUri}/health-check`)
      .get((req: express.Request, res: express.Response) => {
        return res.status(200).json({ message: "I am up !" });
      });

    this.app.route(`${this.baseUri}/user`).post(UserController.register);
    this.app
      .route(`${this.baseUri}/user/login`)
      .post(
        UserController.login,
        commonMiddlewareJwt.generateToken.bind(commonMiddlewareJwt)
      );

    return this.app;
  }
}
