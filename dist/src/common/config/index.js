"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
exports.default = {
    baseUri: "/api/v1",
    publicFilesPath: node_path_1.default.resolve(__dirname, "../../../public"),
};
//# sourceMappingURL=index.js.map