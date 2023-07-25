import { PrismaClient } from "@prisma/client";
import Region from "../dto/region.create.dto";

class RegionDao {
  prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async create(region: Region): Promise<Region> {
    try {
      const new_region = await this.prismaClient.region.create({
        data: {
          name: region.name,
          picture_url: region.picture_url,
        },
      });
      return new_region;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public async getRegions() {
    try {
      const regions = await this.prismaClient.region.findMany({});
      return regions;
    } catch (error) {
      throw error;
    }
  }
}
export default new RegionDao();
