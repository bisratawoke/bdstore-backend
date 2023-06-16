"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../common/common.routes.config"));
const region_controller_1 = __importDefault(require("./controller/region.controller"));
class RegionRoutesConfig extends common_routes_config_1.default {
    constructor(app) {
        super(app);
        this.ConfigureRoutes();
    }
    ConfigureRoutes() {
        this.app
            .route("/api/v1/region")
            .get(region_controller_1.default.getRegions)
            .post(region_controller_1.default.createRegion);
        return this.app;
    }
}
exports.default = RegionRoutesConfig;
//# sourceMappingURL=region.routes.config.js.map