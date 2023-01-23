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
exports.removeLikeModel = exports.getLikeForId = exports.LikePost = exports.getCommentId = exports.updateComment = exports.postComment = exports.getCommentByDog = exports.getAllComment = void 0;
const User_1 = require("../../models/User");
const Comment_1 = require("../../models/Comment");
const Like_1 = require("../../models/Like");
const getAllComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.UserModel.find({ comments: { $exists: true, $not: { $size: 0 } } });
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllComment = getAllComment;
const getCommentByDog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const dog = yield Comment_1.CommentModel.find({ dog: id, exits: true }).sort({ _id: -1 })
            .populate('user');
        res.status(200).json(dog);
    }
    catch (error) {
        next(error);
    }
});
exports.getCommentByDog = getCommentByDog;
const postComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { dog, comment, user } = req.body;
    console.log(req.body);
    try {
        const newComment = new Comment_1.CommentModel({ dog, comment, user });
        yield newComment.save();
        res.status(200).json(newComment);
    }
    catch (error) {
        next(error);
    }
});
exports.postComment = postComment;
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const update = yield Comment_1.CommentModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        return res.status(200).json(update);
    }
    catch (error) {
        next(error);
    }
});
exports.updateComment = updateComment;
const getCommentId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield Comment_1.CommentModel.find({ user: id, exits: true }).populate('dog').populate('user');
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getCommentId = getCommentId;
const LikePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLike = new Like_1.LikeModel(req.body);
        yield newLike.save();
        res.status(200).json(newLike);
    }
    catch (error) {
        next(error);
    }
});
exports.LikePost = LikePost;
const getLikeForId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const like = yield Like_1.LikeModel.find();
        res.status(200).json(like);
    }
    catch (error) {
        next(error);
    }
});
exports.getLikeForId = getLikeForId;
const removeLikeModel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const like = yield Like_1.LikeModel.findById(id).remove();
        res.status(200).json(like);
    }
    catch (error) {
        next(error);
    }
});
exports.removeLikeModel = removeLikeModel;
