import { PrismaClient } from "@prisma/client";
import { createUserDto, getUserDto } from "../dto/user.dto";
class UserDao {
  prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async create(user: createUserDto): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result = await this.prismaClient.user.create({
          data: user,
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async get(user: getUserDto) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const result: any = await this.prismaClient.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (!result)
          reject({
            code: 1,
            message: "User not found",
          });
        if (result.password == user.password) {
          resolve({
            email: result?.email,
            id: result?.id,
          });
        } else {
          reject({
            code: 2,
            message: "Incorrect password",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new UserDao();
