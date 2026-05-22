import express from 'express'
<<<<<<< HEAD
import { getDepartments } from '../controllers/departmentController.js'

const router = express.Router()

router.get('/', getDepartments)

=======
import departmentController from '../controllers/departmentController.js'

const router = express.Router()

router.get('/', departmentController.getDepartments)
router.post('/', departmentController.createDepartment)
>>>>>>> main
export default router
