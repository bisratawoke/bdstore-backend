"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config/"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDirectory = config_1.default.publicFilesPath;
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
//# sourceMappingURL=common.file_handler.js.map