import { Application } from "express";
import CommonRoutesConfig from "../common/common.routes.config";
import commonMiddlewareJwt from "../common/middlewares/common.middleware.jwt";
import ItemController from "./controller/item.controller";
export default class ItemRoutesConfig extends CommonRoutesConfig {
  constructor(app: Application, baseUri: string) {
    super(app, baseUri);
    this.ConfigureRoutes();
  }
  ConfigureRoutes(): Application {
    this.app
      .route(
        `${this.baseUri}/item/:location?/:category?/:max_price?/:min_price?`
      )
      .get(ItemController.getItems)
      .post(
        commonMiddlewareJwt.verifyToken.bind(commonMiddlewareJwt),
        ItemController.createItem
      );
    return this.app;
  }
}
