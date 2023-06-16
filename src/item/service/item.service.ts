import ICreateItemDto from "../dto/item.create.dto";
import ItemDao from "../dao/item.dao";
import { catelog_type, item } from "@prisma/client";
import ItemFilter from "../dto/item.filter.dto";

class ItemService {
  constructor() {}
  public async create(itemDto: ICreateItemDto) {
    try {
      const data = await this.setCatalogType(itemDto);
      const item = await ItemDao.createItem(data);
      return item;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async setCatalogType(
    itemDto: ICreateItemDto
  ): Promise<ICreateItemDto> {
    switch (itemDto.catalog_type) {
      case "CAR":
        itemDto.catalog_type = catelog_type.CAR;
        break;
      case "HOUSE":
        itemDto.catalog_type = catelog_type.HOUSE;
      case "COSMOTICS":
        itemDto.catalog_type = catelog_type.COSMOTICS;
        break;
      case "TECHNOLOGY":
        itemDto.catalog_type = catelog_type.TECHNOLOGY;
        break;
      case "CLOTHING":
        itemDto.catalog_type = catelog_type.CLOTHING;
        break;
      case "OTHER":
        itemDto.catalog_type = catelog_type.OTHER;
    }
    return itemDto;
  }

  public async list(filter: ItemFilter) {
    try {
      let items = await ItemDao.getItems(filter);
      items = await this.filterByLocation(filter.location, items);
      items = await this.filterByCategory(filter.category, items);
      items = await this.filterProductsByPriceRange(
        parseInt(filter.min_price),
        parseInt(filter.max_price),
        items
      );
      return items;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private async filterByLocation(
    location: string,
    items: Array<item>
  ): Promise<Array<item>> {
    if (location.length > 0 && !location.includes("Anywhere")) {
      return items.filter((item: item) =>
        item.region_name.toLowerCase().startsWith(location.toLowerCase())
      );
    }
    return items;
  }

  private async filterByCategory(
    category: string,
    items: Array<item>
  ): Promise<Array<item>> {
    if (category.length > 0 && !category.includes("Everything")) {
      console.log("============== in category filter ==================");
      return items.filter((item: item) =>
        item.catalog_type.toLowerCase().startsWith(category.toLowerCase())
      );
    }
    return items;
  }
  private async filterProductsByPriceRange(
    min_price: number,
    max_price: number,
    current: item[]
  ): Promise<item[]> {
    if (
      min_price &&
      max_price &&
      min_price > 0 &&
      max_price > 0 &&
      min_price != null &&
      max_price != null
    ) {
      return current.filter(
        (product: item) =>
          product.price >= min_price && product.price <= max_price
      );
    } else return current;
  }
}

export default new ItemService();