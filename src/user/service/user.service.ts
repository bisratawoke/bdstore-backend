import UserDao from "../dao/user.dao";
import { createUserDto, getUserDto } from "../dto/user.dto";

class UserService {
  constructor() {}

  async create(createUser: createUserDto) {
    return new Promise<createUserDto>(async (resolve, reject) => {
      try {
        const user = await UserDao.create(createUser);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  async get(getUser: getUserDto) {
    return new Promise<getUserDto>(async (resolve, reject) => {
      try {
        const user = await UserDao.get(getUser);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new UserService();
