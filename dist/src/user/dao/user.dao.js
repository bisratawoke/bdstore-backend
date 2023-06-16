"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class UserDao {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield this.prismaClient.user.create({
                        data: user,
                    });
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield this.prismaClient.user.findUnique({
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
                            email: result === null || result === void 0 ? void 0 : result.email,
                            id: result === null || result === void 0 ? void 0 : result.id,
                        });
                    }
                    else {
                        reject({
                            code: 2,
                            message: "Incorrect password",
                        });
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
}
exports.default = new UserDao();
//# sourceMappingURL=user.dao.js.map