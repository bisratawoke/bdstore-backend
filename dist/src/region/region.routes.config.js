"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../common/common.routes.config"));
const region_controller_1 = __importDefault(require("./controller/region.controller"));
const common_file_handler_1 = __importDefault(require("../common/Filehandler/common.file_handler"));
class RegionRoutesConfig extends common_routes_config_1.default {
    constructor(app, baseUri) {
        super(app, baseUri);
        this.ConfigureRoutes();
    }
    ConfigureRoutes() {
        this.app
            .route(`${this.baseUri}/region`)
            .get(region_controller_1.default.getRegions)
            .post(common_file_handler_1.default.single("region"), region_controller_1.default.createRegion);
        return this.app;
    }
}
exports.default = RegionRoutesConfig;
//# sourceMappingURL=region.routes.config.js.map