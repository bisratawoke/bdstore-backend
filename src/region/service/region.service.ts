import Region from "../dto/region.create.dto";
import regionDao from "../dao/region.dao";
class RegionService {
  constructor() {}
  public async create(data: Region): Promise<Region> {
    try {
      const region = await regionDao.create(data);
      return region;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
export default new RegionService();
