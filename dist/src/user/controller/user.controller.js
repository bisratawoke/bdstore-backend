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
const user_service_1 = __importDefault(require("../service/user.service"));
class UserController {
    constructor() { }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.create(req.body);
                return res.status(201).json(user);
            }
            catch (error) {
                if (error.code) {
                    if (error.code == "P2002") {
                        return res.status(400).json("User already registered");
                    }
                }
                else {
                    return res.sendStatus(500);
                }
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.get(req.body);
                req.user = user;
                next();
            }
            catch (error) {
                console.log(error);
                if (error.code && error.code == 1)
                    return res.status(404).json("User not found");
                if (error.code && error.code == 2)
                    return res.status(400).json("Invalid password");
                else
                    return res.sendStatus(500);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map