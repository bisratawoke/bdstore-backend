"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../common/common.routes.config"));
const user_controller_1 = __importDefault(require("./controller/user.controller"));
const common_middleware_jwt_1 = __importDefault(require("../common/middlewares/common.middleware.jwt"));
class UserRoutesConfig extends common_routes_config_1.default {
    constructor(app) {
        super(app);
        this.ConfigureRoutes();
    }
    ConfigureRoutes() {
        this.app
            .route("/api/v1/health-check")
            .get((req, res) => {
            return res.status(200).json({ message: "I am up !" });
        });
        this.app.route("/api/v1/user").post(user_controller_1.default.register);
        this.app
            .route("/api/v1/user/login")
            .post(user_controller_1.default.login, common_middleware_jwt_1.default.generateToken.bind(common_middleware_jwt_1.default));
        return this.app;
    }
}
exports.default = UserRoutesConfig;
//# sourceMappingURL=user.routes.config.js.map