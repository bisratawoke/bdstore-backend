"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = __importDefault(require("node:http"));
const cors_1 = __importDefault(require("cors"));
const user_routes_config_1 = __importDefault(require("./src/user/user.routes.config"));
const item_routes_config_1 = __importDefault(require("./src/item/item.routes.config"));
const region_routes_config_1 = __importDefault(require("./src/region/region.routes.config"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
const server = node_http_1.default.createServer(app);
const baseUri = "/api/v1";
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
new user_routes_config_1.default(app, baseUri);
new item_routes_config_1.default(app, baseUri);
new region_routes_config_1.default(app, baseUri);
server.listen(PORT, () => console.log(`Listening on  port ${PORT}`));
//# sourceMappingURL=index.js.map