import express from "express";
import regionService from "../service/region.service";
import Region from "../dto/region.create.dto";
import config from "../../common/config";
class RegionController {
  constructor() {}
  public getRegions(req: express.Request, res: express.Response) {
    return res.json([]);
  }
  public async createRegion(req: express.Request, res: express.Response) {
    try {
      if (req.file?.filename) {
        const payload: Region = {
          picture_url: req.file.filename,
          name: req.body.region_name,
        };
        const new_region = await regionService.create(payload);
        return res.json(req.body);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}
export default new RegionController();
