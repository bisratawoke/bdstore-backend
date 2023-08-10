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

  public async setCatalogType(itemDto: any): Promise<ICreateItemDto> {
    switch (itemDto.catalog_type) {
      case "Car":
        itemDto.catalog_type = catelog_type.Car;
        break;
      case "Cars":
        itemDto.catalog_type = catelog_type.Car;
        break;
      case "House":
        itemDto.catalog_type = catelog_type.House;
      case "Cosmotics":
        itemDto.catalog_type = catelog_type.Cosmotics;
        break;
      case "Technology":
        itemDto.catalog_type = catelog_type.Technology;
        break;
      case "Clothing":
        itemDto.catalog_type = catelog_type.Clothing;
        break;
      case "Shoes":
        itemDto.catalog_type = catelog_type.Shoes;
        break;
      default:
        itemDto.catalog_type = catelog_type.Other;
    }
    return itemDto;
  }

  public async list(filter: ItemFilter) {
    try {
      let items = await ItemDao.getItems(filter);
      console.log(items);
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

  public async getNumberOfItemsThatMatch(filter: ItemFilter) {
    try {
      let items = await ItemDao.getItems(filter);
      items = await this.filterByLocation(filter.location, items);
      items = await this.filterByCategory(filter.category, items);
      items = await this.filterProductsByPriceRange(
        parseInt(filter.min_price),
        parseInt(filter.max_price),
        items
      );
      return items.length;
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
          (product.price >= min_price && product.price <= max_price) ||
          product.price <= min_price
      );
    } else return current;
  }

  public async getItemTypes() {
    try {
      const itemTypes = await ItemDao.getItemTypes();
      return itemTypes;
    } catch (error) {
      throw error;
    }
  }

  public async getItem(id: string) {
    try {
      const item = await ItemDao.getItem(id);
      return item;
    } catch (error) {
      throw error;
    }
  }
  public async deleteItem(id: string, owner_id: string) {
    try {
      const item = await ItemDao.delete(id, owner_id);
      return item;
    } catch (error) {
      throw error;
    }
  }

  public async createItemWithOutPic(itemDto: Omit<ICreateItemDto, "picture">) {
    try {
      let record = await this.setCatalogType(itemDto);
      const item = await ItemDao.createItemWithOutPic(record);
      return item;
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemService();
