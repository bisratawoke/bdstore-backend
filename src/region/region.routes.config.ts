import { Application } from "express";
import CommonRoutesConfig from "../common/common.routes.config";
import regionController from "./controller/region.controller";
export default class RegionRoutesConfig extends CommonRoutesConfig {
  constructor(app: Application, baseUri: string) {
    super(app, baseUri);
    this.ConfigureRoutes();
  }
  ConfigureRoutes(): Application {
    this.app
      .route(`${this.baseUri}/region`)
      .get(regionController.getRegions)
      .post(regionController.createRegion);
    return this.app;
  }
}
