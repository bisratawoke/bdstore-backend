import express from "express";
import ItemService from "../service/item.service";
import ItemFilter from "../dto/item.filter.dto";
import IRequestWithUserObject from "../../common/interface/express/common.interface.express.request_with_user_object";
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

      const items = await ItemService.list(filters);
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  }

  public async createItem(req: IRequestWithUserObject, res: express.Response) {
    try {
      const item = await ItemService.create({
        ...req.body,
        owner_id: req.user.id,
        filename: req.file.filename,
      });
      return res.status(201).json("Item created");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server error");
    }
  }

  public async getNumberOfItemsThatMatch(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const filters: ItemFilter = {
        location: req.params.location,
        category: req.params.category,
        max_price: req.params.max_price,
        min_price: req.params.min_price,
      };
      console.log(filters);
      const numberOfItems = await ItemService.getNumberOfItemsThatMatch(
        filters
      );
      return res.json(numberOfItems);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server error");
    }
  }

  public async getItemTypes(req: express.Request, res: express.Response) {
    try {
      const itemTypes = await ItemService.getItemTypes();
      return res.json(itemTypes);
    } catch (error) {
      return res.status(500).json("Server error");
    }
  }

  public async getItem(req: express.Request, res: express.Response) {
    try {
      console.log("============= in get items ==============");
      console.log(req.params);
      const item = await ItemService.getItem(req.params.id);
      return res.json(item);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default new ItemController();
