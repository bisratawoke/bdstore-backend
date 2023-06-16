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
class RegionDao {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    create(region) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_region = yield this.prismaClient.region.create({
                    data: {
                        name: region.name,
                        picture_url: region.picture_url,
                    },
                });
                return new_region;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new RegionDao();
//# sourceMappingURL=region.dao.js.map