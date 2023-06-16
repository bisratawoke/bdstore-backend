import express from "express";
import ItemService from "../service/item.service";
import ItemFilter from "../dto/item.filter.dto";
class ItemController {
  constructor() {}

  public async getItems(req: express.Request, res: express.Response) {
    try {
      const filters: ItemFilter = {
        location: req.params.location,
        category: req.params.category,
        max_price: req.params.max_price,
        min_price: req.params.min_price,
      };

      console.log(filters);
      const items = await ItemService.list(filters);
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server error");
    }
  }

  public async createItem(req: express.Request, res: express.Response) {
    try {
      const item = await ItemService.create({
        ...req.body,
        owner_id: req.user.id,
      });
      return res.status(201).json("Item created");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server error");
    }
  }
}

export default new ItemController();
