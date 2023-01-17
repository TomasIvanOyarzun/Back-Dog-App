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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegister = void 0;
const nodeMailer_1 = require("./nodeMailer");
const emailRegister = (datos) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, token } = datos;
    yield nodeMailer_1.transport.sendMail({
        from: `"Dog - dog breeds "`,
        to: email,
        subject: "Comprueba tu cuenta",
        text: "Comprueba tu cuenta en Dog App",
        html: `<p>Hi ${name}, please check your Dog app account.</p>
    <p>Your account is ready, you just have to check it in the following link</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">check account</a>
        <p>If you did not create this account, you can ignore this email</p>`
    });
});
exports.emailRegister = emailRegister;
