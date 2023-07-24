import { Application } from "express";
import CommonRoutesConfig from "../common/common.routes.config";
import regionController from "./controller/region.controller";
import multer from "multer";
import path from "node:path";
import upload from "../common/Filehandler/common.file_handler";
export default class RegionRoutesConfig extends CommonRoutesConfig {
  constructor(app: Application, baseUri: string) {
    super(app, baseUri);
    this.ConfigureRoutes();
  }
  ConfigureRoutes(): Application {
    this.app
      .route(`${this.baseUri}/region`)
      .get(regionController.getRegions)
      .post(upload.single("region"), regionController.createRegion);
    return this.app;
  }
}
