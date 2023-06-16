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
class ItemDao {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.prismaClient.item.findMany({
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                return items;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    createItem(itemDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.prismaClient.item.create({
                    data: {
                        price: itemDto.price,
                        description: itemDto.description,
                        catalog_type: client_1.catelog_type.CAR,
                        status: client_1.item_status.AVAILABLE,
                        owner: {
                            connect: {
                                id: itemDto.owner_id,
                            },
                        },
                    },
                });
                return item;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new ItemDao();
