import { Router } from "express";
import { postDog, getAllDogs, updateDog , getDogById, getTemperament} from "../../controllers/DogController";

const router = Router()

router.post('/create/dog', postDog)
router.get('/dogs', getAllDogs)
router.put('/dog/:id', updateDog)
router.get('/dog/:id', getDogById)
router.get('/temperaments', getTemperament)
export default router 