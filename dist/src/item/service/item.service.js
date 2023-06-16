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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_dao_1 = __importDefault(require("../dao/item.dao"));
const client_1 = require("@prisma/client");
class ItemService {
    constructor() { }
    create(itemDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.setCatalogType(itemDto);
                const item = yield item_dao_1.default.createItem(data);
                return item;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    setCatalogType(itemDto) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (itemDto.catalog_type) {
                case "CAR":
                    itemDto.catalog_type = client_1.catelog_type.CAR;
                    break;
                case "HOUSE":
                    itemDto.catalog_type = client_1.catelog_type.HOUSE;
                case "COSMOTICS":
                    itemDto.catalog_type = client_1.catelog_type.COSMOTICS;
                    break;
                case "TECHNOLOGY":
                    itemDto.catalog_type = client_1.catelog_type.TECHNOLOGY;
                    break;
                case "CLOTHING":
                    itemDto.catalog_type = client_1.catelog_type.CLOTHING;
                    break;
                case "OTHER":
                    itemDto.catalog_type = client_1.catelog_type.OTHER;
            }
            return itemDto;
        });
    }
    list(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let items = yield item_dao_1.default.getItems(filter);
                items = yield this.filterByLocation(filter.location, items);
                items = yield this.filterByCategory(filter.category, items);
                items = yield this.filterProductsByPriceRange(parseInt(filter.min_price), parseInt(filter.max_price), items);
                return items;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    filterByLocation(location, items) {
        return __awaiter(this, void 0, void 0, function* () {
            if (location.length > 0 && !location.includes("Anywhere")) {
                return items.filter((item) => item.region_name.toLowerCase().startsWith(location.toLowerCase()));
            }
            return items;
        });
    }
    filterByCategory(category, items) {
        return __awaiter(this, void 0, void 0, function* () {
            if (category.length > 0 && !category.includes("Everything")) {
                console.log("============== in category filter ==================");
                return items.filter((item) => item.catalog_type.toLowerCase().startsWith(category.toLowerCase()));
            }
            return items;
        });
    }
    filterProductsByPriceRange(min_price, max_price, current) {
        return __awaiter(this, void 0, void 0, function* () {
            if (min_price &&
                max_price &&
                min_price > 0 &&
                max_price > 0 &&
                min_price != null &&
                max_price != null) {
                return current.filter((product) => product.price >= min_price && product.price <= max_price);
            }
            else
                return current;
        });
    }
}
exports.default = new ItemService();
//# sourceMappingURL=item.service.js.map