import express from "express";
import regionService from "../service/region.service";
class RegionController {
  constructor() {}
  public getRegions(req: express.Request, res: express.Response) {
    return res.json([]);
  }
  public async createRegion(req: express.Request, res: express.Response) {
    try {
      const new_region = await regionService.create(req.body);
      return res.json(new_region);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}
export default new RegionController();
