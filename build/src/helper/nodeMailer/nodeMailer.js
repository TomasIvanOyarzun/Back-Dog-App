"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transport = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'oyarzuntomas99@gmail.com',
        pass: `${process.env.PASS_APLICATION}`
    },
});
