import { Application } from "express";
import CommonRoutesConfig from "../common/common.routes.config";
import commonMiddlewareJwt from "../common/middlewares/common.middleware.jwt";
import ItemController from "./controller/item.controller";
import upload from "../common/Filehandler/common.file_handler";
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
        upload.single("picture"),
        ItemController.createItem
      );

    this.app
      .route(
        `${this.baseUri}/item/match/:location?/:category?/:max_price?/:min_price?`
      )
      .get(ItemController.getNumberOfItemsThatMatch);

    this.app
      .route(`${this.baseUri}/item-description/:id`)
      .get(ItemController.getItem);
    this.app.route(`${this.baseUri}/item-type`).get(
      // commonMiddlewareJwt.verifyToken.bind(commonMiddlewareJwt),
      ItemController.getItemTypes
    );
    return this.app;
  }
}
