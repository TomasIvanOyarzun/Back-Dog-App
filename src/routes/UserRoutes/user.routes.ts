import { Router } from "express";
import {authenticateUser, changePassword, confirmUser, getAllUser, getFavoriteUser, getFavoriteUserDogFull, getUpdateUser, registerUser, userData} from '../../controllers/user/UserController'
import { getAllComment, getCommentId } from "../../controllers/user/UserCommentController";
import { verifyToken } from "../../middleware/verifyToken";
const router = Router()

router.post('/user', registerUser )
router.put('/confirm/:token', confirmUser)
router.post('/authenticate', authenticateUser)
router.get('/authenticate', authenticateUser)
router.put('/change/password/:id', changePassword)
router.get('/user' , verifyToken , userData)
router.get('/comments', getAllComment)
router.get('/all/users', getAllUser)
router.put('/user/update/:id', getUpdateUser)
router.get('/favorite/:id' , getFavoriteUser)
router.get('/favorite/user/:id' , getFavoriteUserDogFull)
router.get('/comment/user/:id' , getCommentId)
export default router 