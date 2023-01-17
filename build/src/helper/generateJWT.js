"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id) => jsonwebtoken_1.default.sign({
    id,
}, `${process.env.JWT_SEC}`, { expiresIn: "1d" });
exports.generateJWT = generateJWT;
