import { Router } from "express";
import { getCommentByDog, getLikeForId, LikePost, postComment, removeLikeModel, updateComment } from "../../controllers/user/UserCommentController"; 


const router = Router()
router.post('/comment', postComment)

//router.get('/comment/user/:id', getCommentByDog2 )
router.put('/comment/:id', updateComment)
router.get('/comments/:id', getCommentByDog)
router.post('/post/like', LikePost)
router.get('/like', getLikeForId)
router.delete('/like/delete/:id', removeLikeModel)
export default router 