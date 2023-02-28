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
exports.getFavoriteUserDogFull = exports.getFavoriteUser = exports.getUpdateUser = exports.getAllUser = exports.userData = exports.changePassword = exports.authenticateUser = exports.confirmUser = exports.registerUser = void 0;
const User_1 = require("../../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJWT_1 = require("../../helper/generateJWT");
const messages_1 = require("../../helper/nodeMailer/messages");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield User_1.UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ error: true, msg: "User already registered" });
    }
    try {
        const encriptPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.UserModel({ name, email, password: encriptPassword });
        yield newUser.save();
        const data = {
            name: newUser.name,
            email: newUser.email,
            token: newUser.token
        };
        (0, messages_1.emailRegister)(data);
        return res.status(200).json({ error: true, msg: 'You have successfully registered' });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const confirmUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const user = yield User_1.UserModel.findOne({ token });
        if (!user)
            return res.status(400).json({ error: true, msg: "invalid token" });
        else {
            user.token = null;
            user.email_confirmed = true;
            yield user.save();
            return res.json({ error: false, msg: "successfully registered user" });
        }
        res.json({ error: false, msg: "usuario registrado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.confirmUser = confirmUser;
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userAuthenticate = yield User_1.UserModel.findOne({ email });
        if (userAuthenticate === null) {
            return res.status(401).send({ msg: "User doesn't exist!" });
        }
        if (userAuthenticate.email_confirmed === false) {
            return res.status(401).send({ msg: "User not confirmed!" });
        }
        else {
            const passwordValidate = yield bcrypt_1.default.compare(password, userAuthenticate.password);
            if (!passwordValidate)
                res.status(401).json({ msg: "Invalid password!" });
            else {
                res.status(200).json({
                    token: (0, generateJWT_1.generateJWT)(userAuthenticate._id),
                    error: false,
                    msg: "User enabled to login",
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.authenticateUser = authenticateUser;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pass, newPassword } = req.body;
    const user = yield User_1.UserModel.findById(id);
    if (!user) {
        return res.status(403).json({ error: true, msg: "Username does not exist" });
    }
    try {
        const passwordValidate = yield bcrypt_1.default.compare(pass, user.password);
        if (passwordValidate) {
            const encriptPassword = yield bcrypt_1.default.hash(newPassword, 10);
            user.password = encriptPassword;
            user.save();
            return res.status(200).json({ error: false, msg: "updated password" });
        }
        else {
            return res.status(500).json({ error: true, msg: "Incorrect password" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
const userData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield User_1.UserModel.findById(req.app.locals.id);
        if (userData == null) {
            res.status(400).json({ msg: "dato del usuario no existen" });
            return;
        }
        const user = {
            _id: userData._id,
            name: userData.name,
            image: userData.image,
            email: userData.email,
            role: userData.role,
            email_confirmed: userData.email_confirmed,
            favorite: userData.favorite.map(el => el)
        };
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.userData = userData;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUser = yield User_1.UserModel.find({ email_confirmed: true });
        res.status(200).json(allUser);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUser = getAllUser;
const getUpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, favorite, email, email_confirmed, image, role } = req.body;
    const { id } = req.params;
    try {
        const userFix = {
            name: userName,
            favorite,
            email,
            email_confirmed,
            image,
            role
        };
        const user = yield User_1.UserModel.findByIdAndUpdate(id, { $set: userFix }, { new: true });
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUpdateUser = getUpdateUser;
const getFavoriteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id !== "undefined") {
            const user = yield User_1.UserModel.findById(req.params.id);
            return res.status(200).json(user === null || user === void 0 ? void 0 : user.favorite);
        }
        return res.status(400).json({ error: true, msg: "an id was not sent" });
    }
    catch (error) {
        next(error);
    }
});
exports.getFavoriteUser = getFavoriteUser;
const getFavoriteUserDogFull = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.UserModel.findById(req.params.id)
            .sort({ _id: -1 })
            .populate('favorite')
            .exec();
        res.status(200).json(user === null || user === void 0 ? void 0 : user.favorite);
    }
    catch (error) {
        next(error);
    }
});
exports.getFavoriteUserDogFull = getFavoriteUserDogFull;
