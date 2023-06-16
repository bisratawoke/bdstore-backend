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
const item_service_1 = __importDefault(require("../service/item.service"));
class ItemController {
    constructor() { }
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = {
                    location: req.params.location,
                    category: req.params.category,
                    max_price: req.params.max_price,
                    min_price: req.params.min_price,
                };
                console.log(filters);
                const items = yield item_service_1.default.list(filters);
                return res.status(200).json(items);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Server error");
            }
        });
    }
    createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield item_service_1.default.create(Object.assign(Object.assign({}, req.body), { owner_id: req.user.id }));
                return res.status(201).json("Item created");
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Server error");
            }
        });
    }
}
exports.default = new ItemController();
//# sourceMappingURL=item.controller.js.map