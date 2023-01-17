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
exports.CommentModel = exports.Comment = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const Dog_1 = require("./Dog");
const User_1 = require("./User");
class Comment {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => Dog_1.Dog }),
    __metadata("design:type", Object)
], Comment.prototype, "dog", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => User_1.User }),
    __metadata("design:type", Object)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Comment.prototype, "like", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Comment.prototype, "exits", void 0);
exports.Comment = Comment;
exports.CommentModel = (0, typegoose_1.getModelForClass)(Comment);
