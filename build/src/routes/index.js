"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dog_routes_1 = __importDefault(require("./DogRoutes/dog.routes"));
const user_routes_1 = __importDefault(require("./UserRoutes/user.routes"));
const comment_routes_1 = __importDefault(require("./commentRoutes/comment.routes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use(dog_routes_1.default);
router.use(user_routes_1.default);
router.use(comment_routes_1.default);
exports.default = router;
