"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtMiddleware {
    constructor() {
        this.secret = process.env.SECRET || "jwt-secret";
    }
    generateToken(req, res) {
        jsonwebtoken_1.default.sign(req.user, this.secret, (err, token) => {
            if (err) {
                return res.sendStatus(500);
            }
            else {
                return res.status(200).json({ token: token });
            }
        });
    }
    verifyToken(req, res, next) {
        let token = req.headers["authorization"];
        token = token.split(" ")[1];
        jsonwebtoken_1.default.verify(token, this.secret, (err, result) => {
            if (err) {
                return res.sendStatus(401);
            }
            else {
                req.user = result;
                next();
            }
        });
    }
}
exports.default = new JwtMiddleware();
//# sourceMappingURL=common.middleware.jwt.js.map