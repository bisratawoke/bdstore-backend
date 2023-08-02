import { Application } from "express";
import express from "express";
import CommonRoutesConfig from "../common/common.routes.config";
import regionController from "./controller/region.controller";
import multer from "multer";
import path from "node:path";
import upload from "../common/Filehandler/common.file_handler";
import regionDao from "./dao/region.dao";
export default class RegionRoutesConfig extends CommonRoutesConfig {
  constructor(app: Application, baseUri: string) {
    super(app, baseUri);
    this.ConfigureRoutes();
  }
  ConfigureRoutes(): Application {
    this.app
      .route(`${this.baseUri}/region/`)
      .get(regionController.getRegions)
      .post(upload.single("region"), regionController.createRegion)
      .delete(async (req: express.Request, res: express.Response) => {
        try {
          await regionDao.deleteRegions();
          return res.json("deleted");
        } catch (error) {
          console.log(error);
          res.json(error.message);
        }
      });
    return this.app;
  }
}
