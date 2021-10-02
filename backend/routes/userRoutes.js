import express from 'express'
const router = express.Router()
import * as user from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleWare.js'

router.route('/').post(user.registerUser).get(protect, admin, user.getUsers)
router.post('/login', user.authUser)
router
	.route('/profile')
	.get(protect, user.getUserProfile)
	.put(protect, user.updateUserProfile)

router
	.route('/:id')
	.delete(protect, admin, user.deleteUser)
	.get(protect, admin, user.getUserById)
	.put(protect, admin, user.updateUser)

export default router
