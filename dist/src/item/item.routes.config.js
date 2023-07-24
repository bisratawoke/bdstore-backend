"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../common/common.routes.config"));
const common_middleware_jwt_1 = __importDefault(require("../common/middlewares/common.middleware.jwt"));
const item_controller_1 = __importDefault(require("./controller/item.controller"));
const common_file_handler_1 = __importDefault(require("../common/Filehandler/common.file_handler"));
class ItemRoutesConfig extends common_routes_config_1.default {
    constructor(app, baseUri) {
        super(app, baseUri);
        this.ConfigureRoutes();
    }
    ConfigureRoutes() {
        this.app
            .route(`${this.baseUri}/item/:location?/:category?/:max_price?/:min_price?`)
            .get(item_controller_1.default.getItems)
            .post(common_middleware_jwt_1.default.verifyToken.bind(common_middleware_jwt_1.default), common_file_handler_1.default.single("picture"), item_controller_1.default.createItem);
        this.app
            .route(`${this.baseUri}/item/match/:location?/:category?/:max_price?/:min_price?`)
            .get(item_controller_1.default.getNumberOfItemsThatMatch);
        this.app.route(`${this.baseUri}/item-type`).get(
        // commonMiddlewareJwt.verifyToken.bind(commonMiddlewareJwt),
        item_controller_1.default.getItemTypes);
        return this.app;
    }
}
exports.default = ItemRoutesConfig;
//# sourceMappingURL=item.routes.config.js.map