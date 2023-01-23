"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCommentController_1 = require("../../controllers/user/UserCommentController");
const router = (0, express_1.Router)();
router.post('/comment', UserCommentController_1.postComment);
//router.get('/comment/user/:id', getCommentByDog2 )
router.put('/comment/:id', UserCommentController_1.updateComment);
router.get('/comments/:id', UserCommentController_1.getCommentByDog);
router.post('/post/like', UserCommentController_1.LikePost);
router.get('/like', UserCommentController_1.getLikeForId);
router.delete('/like/delete/:id', UserCommentController_1.removeLikeModel);
exports.default = router;
