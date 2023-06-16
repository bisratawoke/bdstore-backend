"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../common/common.routes.config"));
const common_middleware_jwt_1 = __importDefault(require("../common/middlewares/common.middleware.jwt"));
const item_controller_1 = __importDefault(require("./controller/item.controller"));
class ItemRoutesConfig extends common_routes_config_1.default {
    constructor(app) {
        super(app);
        this.ConfigureRoutes();
    }
    ConfigureRoutes() {
        this.app
            .route("/api/v1/item/:location?/:category?/:max_price?/:min_price?")
            .get(item_controller_1.default.getItems)
            .post(common_middleware_jwt_1.default.verifyToken.bind(common_middleware_jwt_1.default), item_controller_1.default.createItem);
        return this.app;
    }
}
exports.default = ItemRoutesConfig;
//# sourceMappingURL=item.routes.config.js.map