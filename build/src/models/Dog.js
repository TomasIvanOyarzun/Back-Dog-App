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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogModel = exports.Dog = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_1 = require("mongoose");
let Dog = class Dog {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Dog.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Dog.prototype, "height", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Dog.prototype, "weight", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Dog.prototype, "life_span", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Dog.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String], required: true }),
    __metadata("design:type", Array)
], Dog.prototype, "temperament", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], Dog.prototype, "creator", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: mongoose_1.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Object)
], Dog.prototype, "user", void 0);
Dog = __decorate([
    (0, typegoose_1.plugin)(mongoose_paginate_v2_1.default)
], Dog);
exports.Dog = Dog;
exports.DogModel = (0, typegoose_1.getModelForClass)(Dog);
