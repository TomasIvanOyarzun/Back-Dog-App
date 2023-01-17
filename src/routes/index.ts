import dogRoutes from './DogRoutes/dog.routes'
import userRoutes from './UserRoutes/user.routes'
import commentRoutes from './commentRoutes/comment.routes'
import { Router } from 'express'


const router = Router()

router.use(dogRoutes)
router.use(userRoutes)
router.use(commentRoutes)

export default router