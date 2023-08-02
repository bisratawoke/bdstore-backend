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
          picture_url: itemDto.filename,
          owner: {
            connect: {
              id: itemDto.owner_id,
            },
          },
        },
      });

      return item;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async getItemTypes() {
    try {
      const types = catelog_type;
      return types;
    } catch (error) {
      throw error;
    }
  }

  public async getItem(id: string) {
    try {
      const item = await this.prismaClient.item.findUnique({
        where: {
          id,
        },
        include: {
          owner: {
            select: {
              phone_number: true,
              email: true,
            },
          },
        },
      });
      return item;
    } catch (error) {
      throw error;
    }
  }

  public async isOwner(item_id: string, owner_id: string): Promise<boolean> {
    try {
      const item = await this.prismaClient.item.findUnique({
        where: {
          id: item_id,
        },
      });
      return item.owner_id == owner_id;
    } catch (error) {
      throw error;
    }
  }
  public async delete(id: string, owner_id: string) {
    try {
      // const isOwner = this.isOwner(id, owner_id);
      const isOwner = true;
      if (isOwner) {
        const item = await this.prismaClient.item.delete({
          where: {
            id,
          },
        });
        return item;
      } else throw "Unauthorized";
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemDao();
