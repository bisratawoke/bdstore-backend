import { PrismaClient, catelog_type, item, item_status } from "@prisma/client";
import ICreateItemDto from "../dto/item.create.dto";
import ItemFilter from "../dto/item.filter.dto";

class ItemDao {
  prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  public async getItems(filter: ItemFilter) {
    try {
      let items = await this.prismaClient.item.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return items;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async createItem(itemDto: ICreateItemDto) {
    try {
      console.log(itemDto);
      const item = await this.prismaClient.item.create({
        data: {
          price: parseInt(itemDto.price),
          description: itemDto.description,
          catalog_type: itemDto.catalog_type,
          status: item_status.AVAILABLE,
          region: {
            connect: {
              name: itemDto.region,
            },
          },
          picture_url: itemDto.picture_url,
          owner: {
            connect: {
              id: itemDto.owner_id,
            },
          },
        },
      });

      return item;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default new ItemDao();
