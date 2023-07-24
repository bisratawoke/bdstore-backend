import express from "express";
import UserService from "../service/user.service";

interface IRequestWithUserObject extends express.Request {
  user: any;
}
class UserController {
  constructor() {}

  async register(req: express.Request, res: express.Response) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      console.log("============= in register ==============");
      console.log(error);
      if (error.code) {
        if (error.code == "P2002") {
          return res.status(400).json("User already registered");
        }
      } else {
        return res.sendStatus(500);
      }
    }
  }

  async login(
    req: IRequestWithUserObject,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user = await UserService.get(req.body);
      req.user = user;
      next();
    } catch (error: any) {
      console.log(error);
      if (error.code && error.code == 1)
        return res.status(404).json("User not found");
      if (error.code && error.code == 2)
        return res.status(400).json("Invalid password");
      else return res.sendStatus(500);
    }
  }
}

export default new UserController();
