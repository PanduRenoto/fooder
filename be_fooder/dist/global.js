"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.PORT = exports.BASE_URL = void 0;
const path_1 = __importDefault(require("path"));
/** define path (address) of root folder */
exports.BASE_URL = `${path_1.default.join(__dirname, "../")}`;
exports.PORT = process.env.PORT;
exports.SECRET = process.env.SECRET;
