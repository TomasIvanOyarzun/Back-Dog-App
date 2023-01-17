"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const uuid_1 = require("uuid");
const Dog_1 = require("./Dog");
let Preference = class Preference {
};
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Preference.prototype, "temperaments", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Preference.prototype, "size", void 0);
Preference = __decorate([
    (0, typegoose_1.modelOptions)({ options: { disableLowerIndexes: true } })
], Preference);
class User {
}
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String || null, default: () => (0, uuid_1.v4)() }),
    __metadata("design:type", Object)
], User.prototype, "token", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, default: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png' }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Preference }),
    __metadata("design:type", Preference)
], User.prototype, "preference", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "email_confirmed", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => Dog_1.Dog }),
    __metadata("design:type", Array)
], User.prototype, "favorite", void 0);
exports.User = User;
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
